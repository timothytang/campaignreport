var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://timothy:123456@localhost/timothytest";
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  pg.connect(conString, function(err, client, done) {
    if (err) {
		return console.error('error fetching client from pool', err);
	}
	var query = 'select id, name from t_user';
  	client.query(query, function(err, result) {
  	  if(err) {
        return console.error('error running query: ' + query, err);
      }
      res.send("userId:" + result.rows[0].id + ', userName:' + result.rows[0].name);

  	})
  });
  // res.send('respond for get request');

});

router.post('/', function(req, res, next) {
  res.send('response for post request.');
});

module.exports = router;
