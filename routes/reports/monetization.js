var weiboService = require('./../../dao/publishers/weibo.js');
var xunfeiService = require('./../../dao/publishers/xunfei.js');
var gdtService = require('./../../dao/publishers/gdt.js');
var momoService = require('./../../dao/publishers/momo.js');
var jdService = require('./../../dao/publishers/jd.js');

var express = require('express');
var router = express.Router();
var async=require('async');

router.get('/', function (req, res) {
   var startDateStr = '2016-05-27'; // TODO: get them from request.
   var endDateStr = '2016-05-30';

   var startDate = new Date(Date.parse(startDateStr.replace(/-/g, "/"))); 
   var endDate = new Date(Date.parse(endDateStr.replace(/-/g, "/"))); 
   var finalResult = [];

   async.parallel(
   {
       Weibo: function(callback){
            weiboService.getReport(startDate, endDate, 2, function(result) {
               finalResult = finalResult.concat(result); 
               callback(null, 1);
           })
       },
       Xunfei: function(callback){
            xunfeiService.getReport(startDate, endDate, "", function(result) {
               finalResult = finalResult.concat(result); 
               callback(null, 1);
            })
       },
       GDT: function(callback){
             gdtService.getReport(startDate, endDate, "", function(result) {
                finalResult = finalResult.concat(result); 
                callback(null, 1);
             })
       },
       Momo: function(callback){
            momoService.getReport(startDate, endDate, "", function(result) {
               finalResult = finalResult.concat(result); 
               callback(null, 1);
            })
       }
//       ,
//       JD: function(callback){
//            jdService.getReport(startDate, endDate, "", function(result) {
//               finalResult = finalResult.concat(result); 
//               callback(null, 1);
//            })
//       }
    },

    function(err, results) {
      if (err) {
         console.log('Error happened when generate monetization report: ' + err);
      } else {
         // TODO: to generate the report.
         res.send(JSON.stringify(finalResult, null, 4));
      }
    });


});

module.exports = router;