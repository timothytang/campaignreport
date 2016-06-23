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
function sendActualResult(res, result, publisherCostDiff) {
	var actualResult = [];
	if (result && result.length>0) {
		var index = 0;
		async.whilst(
		          function () { return index<result.length},
		          function (callback) {
		        	  var currentResult = result[index];
		        	  var date = currentResult.campaign_date.stdFormat();
		        	  var adgroupId = currentResult.adgroup_id;
		        	  var targetURL = config.redisActualClickURL+adgroupId+"/"+date+"/"+date+"/0";
		              request.get({url:targetURL}, 
		                   function(err,httpResponse,body){
		            	        var adgroupResult = null;
		                        if (err) {
		                          console.error('Error: failed to get actual click from redis:' + err);
		                          console.error('target URL: ' + targetURL);
		                          adgroupResult=buildActualResult(currentResult, null, null, publisherCostDiff);
		                        } else {
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
		                          
		                          adgroupResult=buildActualResult(currentResult, actualImp, actualClick, publisherCostDiff);
		                        }
		                        
		                        actualResult.push(adgroupResult);
		                        callback(null, 1);
		                        
		              });

		              index++;
		          },
		          function (err, result) {
		            if (err) {
		              console.error('Error: failed to get actual click from redis.');
		            }
		            console.log('Actual click is retrieved for daily report');
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
	if (redshiftClick>0) {
		revenueCPC=Number((xadRevenue/redshiftClick).toFixed(2));
	}
	
	var actualRevenue = null;
	if (actualClick && revenueCPC) {
		actualRevenue=Number((revenueCPC*actualClick).toFixed(2));
	} 
	
	var actualCost = null;
	if (publisherCostDiff) {
		actualCost=Number((xadCost*publisherCostDiff).toFixed(2));
	}
	
	var actualMargin = null;
	if (actualRevenue && actualCost && actualRevenue>0) {
		actualMargin=Number(((actualRevenue-actualCost)/actualRevenue).toFixed(4));
	}
	
	var costCPC = null;
	if (actualCost && actualClick) {
		costCPC = Number((actualCost/actualClick).toFixed(2));
	}
	
	
	var adgroupResult={'Date':originalResult.campaign_date, 'CampaignID':originalResult.campaign_id,
			'CampaignName':originalResult.campaign_name,'AdgroupID':originalResult.adgroup_id,
			'Adgroup Name':originalResult.adgroup_name,'Redshift Imp':originalResult.impression,
			'Redshift Click':originalResult.click,'Xad Revenue':Number(originalResult.xad_revenue.toFixed(2)),
			'Xad Cost':Number(originalResult.publisher_revenue.toFixed(2)), "Revenue CPC":Number(revenueCPC.toFixed(2)),
			'Act Imp': actualImp, 'Act Click': actualClick, 'Act Cost': actualCost, 'Act Rev': actualRevenue,
			'Act Margin': actualMargin, 'Cost CPC': costCPC
			};
	return adgroupResult;
}

module.exports = router;