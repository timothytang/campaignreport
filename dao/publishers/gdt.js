var request = require('request');
var dateUtil = require('date-utils');

var gdtService = function(){};

var gdtRequestJson =
{
    "sendType": 1,
    "vendor": {
        "baseUrl": "https://api.e.qq.com/adx/v1/",
        "uuid": "4f40bc02-e689-11e5-9ad0-3c15c2d24120",
        "name": "腾讯"
    },
    "uuid": "8f77b50c-0518-11e6-a647-0294785bfb23",
    "calls": [],
    "url": "report/exposure",
    "fields": [
        {
            "displayName": "Authorization",
            "uuid": "8f78ca3c-0518-11e6-a647-0294785bfb23",
            "isHeader": 1,
            "isDynamic": 0,
            "value": "Bearer NjgyMzg5LDE0MzYyMzYwODksNmE5ZDU0NzYwZTc4YzA1NTlkNWJhODEzYjIzNThhNTE=",
            "isFile": 0,
            "name": "authorization"
        },
        {
            "displayName": "start_date",
            "uuid": "8f78edd2-0518-11e6-a647-0294785bfb23",
            "isHeader": 0,
            "isDynamic": 1,
            "value": "2016-05-24",
            "isFile": 0,
            "name": "start_date"
        },
        {
            "displayName": "end_date",
            "uuid": "8f79130c-0518-11e6-a647-0294785bfb23",
            "isHeader": 0,
            "isDynamic": 1,
            "value": "2016-05-25",
            "isFile": 0,
            "name": "end_date"
        }
    ],
    "toTemplate": "{\n\t\"data\": \n\t\t{\n\t\t\t\"start_date\": \"{{params.start_date}}\", \n\t\t\t\"end_date\": \"{{params.end_date}}\"\t\t}\n\t\n}",
    "discription": null,
    "fromTemplate": null,
    "vendorUUID": "4f40bc02-e689-11e5-9ad0-3c15c2d24120",
    "name": "查询数据报告"
}

var apiUI

// we don't directly call GDT restful api to get the data, instead, we get the data throught the API UI built by Craig.
gdtService.prototype.getReport=function(startDate, endDate, type, callback) {
  var startDateStr = startDate.stdFormat();
  var endDateStr = endDate.stdFormat();
  var gdtRequestJson=createGDTRequest(startDateStr, endDateStr);
  var options = {
       url: 'http://ec2-54-223-151-163.cn-north-1.compute.amazonaws.com.cn:9999/api/run',
       headers: {"Content-Type": "application/json;charset=utf-8"},
       method: 'POST',
       json:true,
       body: gdtRequestJson
      };

  var allDateDetails = [];
  request(options, function(error, response, body) {
       if (!error && response.statusCode == 200) {
        if(body.response.code==0) { // get report successfully.
          var gdtData = body.response.data;
          for (var i=0;i<gdtData.length;i++) {
            var gdtDate = gdtData[i].date + '';
            var stdGdtDate = gdtDate.slice(0,4) + '-' +gdtDate.slice(4,6)+ '-'+ gdtDate.slice(6,8);
            var cost= Number(gdtData[i].cost)/100;
            var imp = gdtData[i].valid_pv;
            var click= gdtData[i].click;
            allDateDetails[i] = {publisher:"GDT", date: stdGdtDate, impression: imp, click:click, cost: cost};
            console.log('GDT date detail: ' + JSON.stringify(allDateDetails[i]) );

          }
        } else {
          console.log("Error: failed to get report from GDT: " + body);
        } 
        callback(allDateDetails);
       } else {
         console.log("Error: failed to connect to GDT for report!");
       }
    });

}

function createGDTRequest(startDate, endDate) {
	var gdtRequestJson =
	{
	    "sendType": 1,
	    "vendor": {
	        "baseUrl": "https://api.e.qq.com/adx/v1/",
	        "uuid": "4f40bc02-e689-11e5-9ad0-3c15c2d24120",
	        "name": "腾讯"
	    },
	    "uuid": "8f77b50c-0518-11e6-a647-0294785bfb23",
	    "calls": [],
	    "url": "report/exposure",
	    "fields": [
	        {
	            "displayName": "Authorization",
	            "uuid": "8f78ca3c-0518-11e6-a647-0294785bfb23",
	            "isHeader": 1,
	            "isDynamic": 0,
	            "value": "Bearer NjgyMzg5LDE0MzYyMzYwODksNmE5ZDU0NzYwZTc4YzA1NTlkNWJhODEzYjIzNThhNTE=",
	            "isFile": 0,
	            "name": "authorization"
	        },
	        {
	            "displayName": "start_date",
	            "uuid": "8f78edd2-0518-11e6-a647-0294785bfb23",
	            "isHeader": 0,
	            "isDynamic": 1,
	            "value": startDate,
	            "isFile": 0,
	            "name": "start_date"
	        },
	        {
	            "displayName": "end_date",
	            "uuid": "8f79130c-0518-11e6-a647-0294785bfb23",
	            "isHeader": 0,
	            "isDynamic": 1,
	            "value": endDate,
	            "isFile": 0,
	            "name": "end_date"
	        }
	    ],
	    "toTemplate": "{\n\t\"data\": \n\t\t{\n\t\t\t\"start_date\": \"{{params.start_date}}\", \n\t\t\t\"end_date\": \"{{params.end_date}}\"\t\t}\n\t\n}",
	    "discription": null,
	    "fromTemplate": null,
	    "vendorUUID": "4f40bc02-e689-11e5-9ad0-3c15c2d24120",
	    "name": "查询数据报告"
	}
	return gdtRequestJson;
}

module.exports=new gdtService();

// todo: 1, replace date in request, 2. parse response. hold on for now.