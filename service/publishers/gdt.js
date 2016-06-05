var request = require('request');
var dateUtil = require('date-utils');
var config=require('./../../config.js');


var gdtService = function(){};

/**
 * 
 */
gdtService.prototype.getReport=function(startDate, endDate, type, callback) {
  var startDateStr = startDate.stdFormat();
  var endDateStr = endDate.stdFormat();
  var gdtRequestJson=createGDTRequest(startDateStr, endDateStr);
  var options = {
       url: 'https://api.e.qq.com/adx/v1/report/exposure',
       headers: {"Content-Type": "application/json;charset=utf-8",
                 "Authorization": config.gdtAuthorization
    	   },
       method: 'POST',
       json:true,
       body: gdtRequestJson
      };

  var allDateDetails = [];
  request(options, function(error, response, body) {
       if (!error && response.statusCode == 200) {
        if(body.code==0) { // get report successfully.
          var gdtData = body.data;
          for (var i=0;i<gdtData.length;i++) {
            var gdtDate = gdtData[i].date + '';
            var stdGdtDate = gdtDate.slice(0,4) + '-' +gdtDate.slice(4,6)+ '-'+ gdtDate.slice(6,8);
            var cost= Number(gdtData[i].cost)/100;
            var imp = gdtData[i].valid_pv;
            var click= gdtData[i].click;
            allDateDetails[i] = {publisher:"GDT", date: stdGdtDate, impression: imp, click:click, cost: cost};
          }
        } else {
          console.error("Error: failed to get report from GDT: " + body);
        }       
       } else {
         console.error("Error: failed to connect to GDT for report!");
       }
       callback(allDateDetails);
       console.log('GDT data processing is done.');
    });

}

function createGDTRequest(startDate, endDate) {
	var gdtRequestJson ={
			"data": {
				"start_date":startDate, 
				"end_date": endDate		}	
	}
	return gdtRequestJson;
}

module.exports=new gdtService();