

var xlsx = require('node-xlsx'); 
var fs = require('fs'); 
var data = [ [ 1, 2,4],[1,1,1]];

var obj =[{name: "mySheetName", data: data}]
var file = xlsx.build(obj); 
fs.writeFileSync('/Users/timothytang/test/user.xlsx', file, 'binary');

function getXlsxFormatData (data) {
    var xlsxData = [];
    var count = 0;
    for (var index in data) {
        var oneLine = data[index];
        var row = [];
        var headers;
        if (index == 0) {
            headers = [];
        }
        for (var index2 in oneLine) {
            if (index == 0) {
                headers.push(index2);
            }
            var value = oneLine[index2];
            if (value == null) {
                value = "NA";
            }
            row.push(value);
        }
        if (index == 0) {
            xlsxData.push(headers);
        }
        xlsxData.push(row);
         
    }
    console.log(xlsxData);
    return xlsxData;
}
var json = [{ "publisher": "Weibo", "date": "2016-05-27", "impression": 1019729, "click": 5003, "cost": 10553.38}];
getXlsxFormatData(json);