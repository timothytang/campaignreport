var request = require('request');
var md5 = require('md5');
var config=require('./../../config.js');
var momoService = function(){};


momoService.prototype.getReport=function(startDate, endDate, type, callback) {
  var startDateStr = startDate.stdFormat();
  var endDateStr = endDate.stdFormat();
//	  var startDateStr = '2016-05-31';
//	  var endDateStr = '2016-06-02';
  var nowTime = new Date();
  var uptimeLong = nowTime.getTime();
  var md5Sign = createMomoMD5Sign(uptimeLong);
  var momoRequest = { dspid: "xad", uptime: uptimeLong, start_time : startDateStr,  end_time : endDateStr,  sign : md5Sign}
  var momoRequestStr = JSON.stringify(momoRequest);
  var options = {
       url: 'https://openad.immomo.com/adx/api/idea/queryReportData',
       headers: {"Content-Type": "application/json;charset=utf-8"},
       method: 'POST',
       json:true,
       form: {data: momoRequestStr}
      };

  var allDateDetails = [];
  request(options, function(error, response, body) {
       if (!error && response.statusCode == 200) {
         if(body.ec==200) { // succesful response.
           for(var i=0;i<body.data.length;i++) {
              var date = body.data[i].time;
              var cost = body.data[i].fee;
              var imp = body.data[i].display;
              var click = body.data[i].click;
              allDateDetails[i] = {publisher:"Momo", date: date, impression: imp, click:click, cost: cost};
           }
         } else {
           console.error("Failed to get Momo report: " + JSON.stringify(body));
         }
       } else {
         console.error("Failed to connect to Momo!");
       }
       callback(allDateDetails);
       console.log('Momo data processing is done.' + JSON.stringify(allDateDetails));
       
    });

}



function createMomoMD5Sign(uptime) {
   var plainText = config.momoSignFeed+uptime;
   var md5Sign=md5(plainText).toLocaleUpperCase();
   return md5Sign;
}

module.exports=new momoService();