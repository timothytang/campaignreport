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
//    if (!data || data.length==0) {
//    	res.statusCode=404;
//    	res.send("No result found");
//    	return;
//    }
    for (var index in data) {
        var oneLine = data[index];
        var row = [];
        var headers;
        if (index == 0) {
            headers = [];
        }
        for (var key in oneLine) {
            if (index == 0) {
                headers.push(key);
            }
            var value = oneLine[key];
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
        	// by using angular framework in the web page, files cannot be downloaded by following setup,the file
        	// download now is handled by javascript in the web page.
        	
//        'Content-Disposition': 'attachment;filename='+fileName + '.xlsx'
    });    
    var obj =[{name: "data", data: xlsxData}]
    console.log('Records number is: ' + xlsxData.length);
    var file = xlsx.build(obj); 
    console.log('Build xlsx file successfully');
    response.write(file);
    response.end();    
}

module.exports=new fileUtil();