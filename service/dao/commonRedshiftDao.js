/**
 * http://usejsdoc.org/
 */
var pg = require('pg');
var Pool = require('pg-pool');
var types = require('pg').types
types.setTypeParser(20, function(val) {
  return Number(val)
})
types.setTypeParser(1700, function(val) {
  return Number(val)
})

var config=require('./../../config.js');

var pgConfig = {
		  user: config.redshiftUserName, //env var: PGUSER
		  database: config.redshiftDB, //env var: PGDATABASE
		  password: config.redshiftPassword, //env var: PGPASSWORD
		  port: config.redshiftPort, //env var: PGPORT
		  max: 10, // max number of clients in the pool
		  host:config.redshiftHost,
		  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
		};

var pool = new Pool(pgConfig);

var redshiftDao=function(){};		

/**
 * Common API to query redshift database in AWS. Please make sure the connection information in /campaignreport/config.js is configured correctly.
 * 
 * @param query
 * @param callback
 */
redshiftDao.prototype.query=function(query, callback) {
	var conString = config.redshiftConnection;
	pg.connect(conString, function(err, client, done) {
	    if (err) {
			console.error('error fetching client from pool', err);
			return callback(err, null);
		}
	    console.log('Runing query: ' + query);
	  	client.query(query, function(err, result) {
		  	if(err) {
		        console.error('Runing query failed!', err);
				return callback(err, null);
		    } else {
		    	console.log('Runing query succeeded.');

		    	return callback(null, result.rows);
		    }
		  }
	  	)
	  });
}

module.exports=new redshiftDao();