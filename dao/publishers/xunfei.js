var request= require('request');
var cheerio = require('cheerio');
var dateUtil = require('date-utils');
var async=require('async');
var config=require('./../../config.js');

var xunfeiService = function(){};

var domain = 'http://www.voiceads.cn';
var loginUrl=domain+'/index.php/dspmanage/login?dsp_account='+ config.xunfeiUserName + '&dsp_pwd='+ config.xunfeiPassword+'&step=2';
var reportURL = domain+'/dspmanage/datareport/datastatistics';

// console.log($.serializeObject);
request=request.defaults({jar: true})
var j = request.jar()

xunfeiService.prototype.getReport=function(startDate, endDate, type, externalCallback) {
  // step 1: login
  request.cookie('PHPSESSID=""');//clear login cookie.
  var allDateDetails = [];
  request.get({url:loginUrl, jar: j}, function(err,httpResponse,body){
      if (!err) {
        // var cookies = j.getCookies(domain);
        // console.log('xunfei session cookie info -> ' + cookies); 
        // steop 2: get to report page.
        // In order to get the daily data, we need to search the data day by day.
        var i=0;
        async.whilst(
          function () { return Date.compare(startDate, endDate)<=0 },
          function (callback) {
              var startDateStr = startDate.stdFormat();
              var endDateStr = endDate.stdFormat();
              request.post({url:reportURL, jar:j,form:{start_dt: startDateStr, end_dt:startDateStr}}, 
                   function(err,httpResponse,body){
                        if (err) {
                          console.log('Error: failed to get Xunfei data on day: ' + startDateStr);
                          callback(err, 1);
                        } else {
                          $ = cheerio.load(body);
                          var tds = $('#adunit_summary tr').eq(0).find('td');
                          var cost = tds.eq(4).text().replace('￥','');
                          var imp = tds.eq(2).text();
                          var click = tds.eq(3).text();
                          var dateDetail= {publisher:"Xunfei", date: startDateStr, impression: imp, click:click, cost: cost};
                          allDateDetails.push(dateDetail);
                          callback(null, 1);
                        }
                        
              });

              i++;
              startDate.addDays(1);
          },
          function (err, result) {
            if (err) {
              console.log('Error: failed to get report from Xunfei.');

            } 
            externalCallback(allDateDetails);
          }
        );
      } else {
        console.log('Error: failed to login to xunfei.');
        externalCallback(allDateDetails);// directly return if error
      }
     
  });

}

module.exports=new xunfeiService();

