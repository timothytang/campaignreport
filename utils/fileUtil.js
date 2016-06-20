var xlsx = require('node-xlsx'); 
var fileUtil=function(){};

/**
 * Sends the file back to the client in xlsx format.
 * 
 * @param response
 * @param data
 * @param fileName: .xlsx will be automatically added as suffix, so the fileName input doesn't need to have .xlsx suffix.
 */
fileUtil.prototype.sendAsXlsxFile=function (response, data, fileName) {
    var xlsxData = [];
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
                value = "NULL";
            }
            row.push(value);
        }
        if (index == 0) {
            xlsxData.push(headers);
        }
        xlsxData.push(row);

    }
    response.writeHead(200, {
        'Content-Type': 'document/xlsx'
//        	,
//        'Content-Disposition': 'attachment;filename='+fileName + '.xlsx'
    });    
    var obj =[{name: "data", data: xlsxData}]
    var file = xlsx.build(obj); 
    response.write(file);
    response.end();    
}

module.exports=new fileUtil();