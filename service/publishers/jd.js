var request= require('request');
var cheerio = require('cheerio');
var dateUtil = require('date-utils');
var async=require('async');
var jdService = function(){};


var userName="";
var password="";
var domain = 'http://dsp.jdx.jd.com';
var loginUrl='https://passport.jd.com/uc/login';
var reportURL = domain+'/api/report';

// console.log($.serializeObject);
request=request.defaults({jar: true, followAllRedirects: true, followRedirect: true})
var j = request.jar()

jdService.prototype.getReport=function(startDate, endDate, type, externalCallback) {
  // step 1: login
  var allDateDetails = [];
  request.get({url:loginUrl, jar: j}, function(err,httpResponse,body){
      if (!err) { 
        var cookies = j.getCookies('*.com');
        console.log('JD cookies-> ' + cookies); 

        // steop 2: get to report page.
        var startDateStr = startDate.stdFormat();
        var endDateStr = endDate.stdFormat();
        var reportRequest = {name:"竞价投放",key:"日期",date_from:startDateStr,date_to:endDateStr,
                      "filters":{"流量类型":"all"},"paging":{"page":1,"page_size":8}};

             var options = {
                   url: reportURL,
                   headers: {"Content-Type": "application/json;charset=utf-8"},
                   method: 'POST',
                   json:true,
                   body: reportRequest,
                   jar:j
                  };
              
              request.cookie('pinId=LWaenVT25LTybKL6ojKoVg');//clear login cookie. 
              request.cookie('user-key=f3ed4744-5c0a-4b12-bba6-e6345dae7948')
              request.cookie('pin=zhenkeguanggao')
          	
              request.post(options, function(err,httpResponse,body){
                        if (err) {
                          console.log('Error: failed to get JD data:' + error);
                          externalCallback(null);
                        } else {
                          console.log("JD response: " + body);
                          console.log("JD http status: " + httpResponse.statusCode);

                          // $ = cheerio.load(body);
                          // var tds = $('#adunit_summary tr').eq(0).find('td');
                          // var cost = tds.eq(4).text().replace('￥','');
                          // var imp = tds.eq(2).text();
                          // var click = tds.eq(3).text();
                          // var dateDetail= {publisher:"Xunfei", date: startDateStr, impression: imp, click:click, cost: cost};
                          // allDateDetails.push(dateDetail);
                          externalCallback(null);
                        }
                        
              });
      } else {
        console.log('Error: failed to login to JD.');
        externalCallback(allDateDetails); //
      }
  }); 
}

module.exports=new jdService();

