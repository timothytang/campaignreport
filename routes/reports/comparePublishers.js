var weiboService = require('./../../service/publishers/weibo.js');
var xunfeiService = require('./../../service/publishers/xunfei.js');
var gdtService = require('./../../service/publishers/gdt.js');
var momoService = require('./../../service/publishers/momo.js');
var jdService = require('./../../service/publishers/jd.js');
var comparePublishersService = require('./../../service/comparePublishersService.js');
var fileUtil = require('./../../utils/fileUtil.js');

var express = require('express');
var router = express.Router();
var async=require('async');
router.get('/',function(req,res){
	res.render('reports/comparePublishersReport', { title: 'Comparison Report' });
});
		
router.post('/', function (req, res) {
   
   // TODO: to validate the dates.
   var startDateStr = req.body.startDate;
   var endDateStr = req.body.endDate;

   var startDate = new Date(startDateStr); 
   var endDate = new Date(endDateStr); 
   var publisersResult = [];
   var xadResult=[];

   async.parallel(
   {
       Weibo: function(callback){
            weiboService.getReport(startDate, endDate, 2, function(result) {
               publisersResult = publisersResult.concat(result); 
               callback(null, 1);
           })
       }
       ,
       Xunfei: function(callback){
            xunfeiService.getReport(startDate, endDate, "", function(result) {
               publisersResult = publisersResult.concat(result); 
               callback(null, 1);
            })
       }
       ,
       GDT: function(callback){
             gdtService.getReport(startDate, endDate, "", function(result) {
                publisersResult = publisersResult.concat(result); 
                callback(null, 1);
             })
       }
       ,
       Momo: function(callback){
            momoService.getReport(startDate, endDate, "", function(result) {
               publisersResult = publisersResult.concat(result); 
               callback(null, 1);
            })
       }
       ,
       // JD integration doesn't work now, comment out for temp.
//       JD: function(callback){
//            jdService.getReport(startDate, endDate, "", function(result) {
//               publisersResult = publisersResult.concat(result); 
//               callback(null, 1);
//            })
//       }
//       ,
       XAD: function(callback){
    	   comparePublishersService.getXadMonetizationReport(startDate, endDate, function(err, result) {
    		   if (err) {
    			   console.error('Failed to get xad monetization report: ' + err);
    		   }
    		   xadResult = result;
               callback(null, 1);
            })
       }
    },

    function(err, results) {
      if (err) {
         console.error('Error happened when generate monetization report: ' + err);
      } else {
    	 mergeXadAndPublisherResult(xadResult,publisersResult);
    	 fileUtil.sendAsXlsxFile(res,xadResult, null);
      }
    });

});

/**
 * Merge publisher result into xad result, the result format will be: 
 * {"publiser":"Weibo","xad_cost":"200.010000","xad_impression":"10000001","xad_click":"1001","date":"2016-05-27", "publisher_impression": 1019729, "publisher_click": 5003, "publisher_cost": 10553.38 }
 * Notes: that since some publishers don't have APIs to be used to get data, so the publisher result don't inlcude the data from all publishers, like Adview, JD, Zplay, Sohu.
 * 
 * @param xadResult Array of records:{"publiser":"Weibo","xad_cost":"200.010000","xad_impression":"10000001","xad_click":"1001","date":"2016-05-27"}
 * @param publisersResult Array of records:  { "publisher": "Weibo", "date": "2016-05-27", "impression": 1019729, "click": 5003, "cost": 10553.38} 
 */
function mergeXadAndPublisherResult(xadResult, publishersResult) {
	var publishersResultMap = {};
	for (var i=0;i<publishersResult.length;i++) {
		var key = publishersResult[i].publisher+publishersResult[i].date;
		publishersResultMap[key]=publishersResult[i];
	}
	
	for (var i=0;i<xadResult.length;i++) {
		var xadRow = xadResult[i];
		var key = xadRow.publisher+xadRow.date;
		var publisherRow = publishersResultMap[key];
		if (publisherRow) {
			xadRow.publisher_cost=publisherRow.cost;
			xadRow.publisher_impression=publisherRow.impression;
			xadRow.publisher_click=publisherRow.click;
		} else {
			xadRow.publisher_cost='NA';
			xadRow.publisher_impression='NA';
			xadRow.publisher_click='NA'; // NA means not available, if no cost/imp/click, the value will be 0;
		}
	}
}

module.exports = router;