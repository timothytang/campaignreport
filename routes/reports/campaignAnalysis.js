var fileUtil = require('./../../utils/fileUtil.js');
var campaignService = require('./../../service/campaignService.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('reports/campaignAnalysisReport', { title: 'Campaign Analysis' });
});
		
router.post('/', function (req, res) {
	campaignService.getCampaigns(req.body, function (err, result) {
		if (err) {
			console.error("Failed to run campaign analysis report" + JSON.stringify(err));
	        res.statusCode=500;
	        res.send(JSON.stringify(err));
		} else {	
			console.log('Campaign analysis report is retrieved.');
	    	fileUtil.sendAsXlsxFile(res,result, null);
		}
	});

});




module.exports = router;