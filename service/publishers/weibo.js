var request = require('request');
var config=require('./../../config.js');

var weiboService = function(){};

weiboService.prototype.getReport=function(startDate, endDate, type, callback) {
  var startDateStr = startDate.stdFormat();
  var endDateStr = endDate.stdFormat();
  var wbRequest = {dspid: config.weiboDspId, token: config.weiboDspToken,start_date: startDateStr,end_date : endDateStr,type : type};
  var options = {
       url: 'http://api.wax.weibo.com/dsp/report',
       headers: {"Content-Type": "application/json;charset=utf-8"},
       method: 'POST',
       json:true,
       body: wbRequest
      };
  var allDateDetails = [];
  request(options, function(error, response, body) {
       if (!error && response.statusCode == 200) {
         //sample correct response {"ret_code":0,"ret_msg":{"type":2,"reports":[{"count":1,"records":[{"date":"2016-05-24","detail":[{"ad_place":"主feed流","bid":"1033955","winbid":"594888","impression":"594888","click":"4200","cost":"8109.85","fee":0}]}]}]},"err_code":0}
         // right now we only support report type=2.
         if (body.ret_code == 0) {
           var dateRecords=body.ret_msg.reports[0].records;
           
           for (var i = 0; i < dateRecords.length; i++) {
              var date = dateRecords[i].date;
              var imp=0;
              var click=0;
              var cost=0.0;
              for (var j =0; j< dateRecords[i].detail.length; j++) {
                imp = imp + Number(dateRecords[i].detail[j].impression);
                click = click + Number(dateRecords[i].detail[j].click);
                cost = cost + Number(dateRecords[i].detail[j].cost);
              }

              allDateDetails[i] = {publisher:"Weibo", date: date, impression: imp, click:click, cost: cost};
           }
         } else {
           console.error("Failed to get Weibo report: " + JSON.stringify(body));
         }
       } else {
         console.error("Failed to connect to Weibo!");
       }
       callback(allDateDetails);
       console.log('Weibo data processing is done.');
    });

}





module.exports=new weiboService();