var fileUtil = require('./../../utils/fileUtil.js');
var utils = require('./../../utils/utils');
var campaignService = require('./../../service/campaignService.js');
var request= require('request');
var cheerio = require('cheerio');
var dateUtil = require('date-utils');
var async=require('async');
var config=require('./../../config.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	var currentDate = new Date();
	var yesterday = currentDate.addDays(-1);
	var dateStr = yesterday.stdFormat();
	res.render('reports/campaignDailyReport', { title: 'Campaign Daily Report', defaultDate:dateStr});
});
		
router.post('/', function (req, res) {
	var reportRequest = req.body;
	reportRequest.groupBy={day:"true", campaign:"true", adgroup:"true"};
	campaignService.getCampaigns(req.body, function (err, result) {
		if (err) {
			console.error("Failed to run campaign daily report" + JSON.stringify(err));
	        res.statusCode=500;
	        res.send(JSON.stringify(err));
		} else {	
            sendActualResult(res, result, reportRequest.publisherCostDiff);
		}
	});	
});

/**
 * The actual click result in redshift is not accurate, we have a tracking system which tracks the actual click in Redis，
 * here we will get final result based on actual click.
 * 
 * @param result, format is campaign_date	campaign_id	campaign_name	adgroup_id	adgroup_name	impression	click	publisher_revenue	xad_revenue
 */
function sendActualResult(res, xadResult, publisherCostDiff) {
	var actualImlAndClick = {};
	var i = 0;
	if (xadResult && xadResult.length>0) {
		async.each(xadResult,
		          function (currentResult, callback) {
		        	  var date = currentResult.campaign_date.stdFormat();
		        	  var adgroupId = currentResult.adgroup_id;
		        	  var targetURL = config.redisActualClickURL+adgroupId+"/"+date+"/"+date+"/0";
		              request.get({url:targetURL}, 
		                   function(err,httpResponse,body){
		                        if (err) {
		                          console.error('Error: failed to get actual click from redis:' + err);
		                          console.error('target URL: ' + targetURL);
		                          actualImlAndClick[adgroupId+date]={actImp:null, actClick:null};
		                        } else {
		                          console.log("Get actual succeeded： " + targetURL)
		                          $ = cheerio.load(body);
		                          var tds = $('tr').eq(0).find('td');
		                          var actualImp = tds.eq(3).text();
		                          var actualClick = tds.eq(2).text();
		                          if (actualImp=='null') {
		                        	  actualImp=null;
		                          } else {
		                        	  actualImp=Number(actualImp);
		                          }
		                          if (actualClick=='null') {
		                        	  actualClick=null;
		                          } else {
		                        	  actualClick=Number(actualClick);
		                          }
		                          
//		                          adgroupResult=buildActualResult(currentResult, actualImp, actualClick, publisherCostDiff);
		                          actualImlAndClick[adgroupId+date]={actImp:actualImp, actClick:actualClick};
		                        }
		                        
		                        callback(null, 1);
		                        
		              });
		              console.log("index is: " + i);
		              i++;
		          },
		          function (err, result) {
		            if (err) {
		              console.error('Error: failed to get actual click from redis.');
		              // not return, still handling the partial processed result.
		            }
		            console.log('Actual click is retrieved for daily report');
		        	var actualResult = [];
		            for (var index in xadResult) {
		            	var imlAndClick = actualImlAndClick[xadResult[index].adgroup_id + xadResult[index].campaign_date.stdFormat()];
		            	var adgroupResult=buildActualResult(xadResult[index], imlAndClick.actImp, imlAndClick.actClick, publisherCostDiff);
		            	console.log(adgroupResult);
		            	actualResult.push(adgroupResult);
		            }
		            console.log("final: " + actualResult)
		            fileUtil.sendAsXlsxFile(res,actualResult, null);
		          }
		        );		
	} else {
		fileUtil.sendAsXlsxFile(res,actualResult, null); //TODO: We probably should not return empty file, we should alert error.
	}
}

function buildActualResult(originalResult,actualImp, actualClick, publisherCostDiff) {
	var xadRevenue = originalResult.xad_revenue;
	var redshiftClick = Number(originalResult.click);
	var xadCost = Number(originalResult.publisher_revenue);
	var revenueCPC = null;
	if (redshiftClick>0 && xadRevenue>0) {
		revenueCPC=Number(to2Fixed((xadRevenue/redshiftClick)));
	}
	
	var actualRevenue = null;
	if (actualClick && revenueCPC) {
		actualRevenue=Number(to2Fixed((revenueCPC*actualClick)));
	} 
	
	var actualCost = null;
	if (publisherCostDiff && xadCost) {
		actualCost=Number(to2Fixed((xadCost*publisherCostDiff)));
	}
	
	var actualMargin = null;
	if (actualRevenue && actualCost && actualRevenue>0) {
		actualMargin=Number(((actualRevenue-actualCost)/actualRevenue).toFixed(4));
	}
	
	var costCPC = null;
	if (actualCost && actualCost>0 && actualClick && actualClick>0) {
		costCPC = Number(to2Fixed((actualCost/actualClick)));
	}
	
	
	var adgroupResult={'Date':originalResult.campaign_date, 'CampaignID':originalResult.campaign_id,
			'CampaignName':originalResult.campaign_name,'AdgroupID':originalResult.adgroup_id,
			'Adgroup Name':originalResult.adgroup_name,'Redshift Imp':originalResult.impression,
			'Redshift Click':originalResult.click,'Xad Revenue':Number(to2Fixed(originalResult.xad_revenue)),
			'Xad Cost':Number(to2Fixed(originalResult.publisher_revenue)), "Revenue CPC":Number(to2Fixed(revenueCPC)),
			'Act Imp': actualImp, 'Act Click': actualClick, 'Act Cost': actualCost, 'Act Rev': actualRevenue,
			'Act Margin': actualMargin, 'Cost CPC': costCPC
			};
	return adgroupResult;
}

function to2Fixed(number) {
	if (number) {
		return number.toFixed(2);
	} else {
		return number;
	}
}

module.exports = router;
