/**
 * http://usejsdoc.org/
 */
var pg = require('pg');
var config=require('./../../config.js');

var redshiftDao=function(){};

/**
 * Common API to query redshift database in AWS. Please make sure the connection information in /campaignreport/config.js is configured correctly.
 * 
 * @param query
 * @param callback
 */
redshiftDao.prototype.query=function(query, callback) {
	var conString = config.reshiftConnection;
	pg.connect(conString, function(err, client, done) {
	    if (err) {
			console.error('error fetching client from pool', err);
			return callback(err, null);
		}
	  	client.query(query, function(err, result) {
		  	if(err) {
		        console.error('error running query: ' + query, err);
				return callback(err, null);
		    } else {
		    	return callback(null, result.rows);
		    }
		  }
	  	)
	  });
}

module.exports=new redshiftDao();