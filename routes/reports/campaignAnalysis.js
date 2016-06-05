var fileUtil = require('./../../utils/fileUtil.js');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('reports/campaignAnalysisReport', { title: 'Campaign Analysis' });
});
		
router.post('/', function (req, res) {
   
   res.send('test');
});



module.exports = router;