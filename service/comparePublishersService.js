/**
 * http://usejsdoc.org/
 */
var redshiftDao = require('./../service/dao/commonRedshiftDao.js');

var comparePublishersService = function() {
};

// TODO: to refine the SQL.
var sumpublisherCostSQLTemplate = 
	      "select timestamp as date, \'Weibo\' as publisher, sum(pub_gross_revenue) as xad_cost,sum(ad_impression) as xad_impression, sum(click) as xad_click from campaign_daily_summary where publisher_id=541 and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'GDT\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression, sum(click) as xad_click from campaign_daily_summary cp  where cp.publisher_id in (546, 556, 557) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'Adview\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression,sum(click) as xad_click from campaign_daily_summary cp where cp.publisher_id in (536,526,535,534,539) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'Xunfei\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression, sum(click) as xad_click from campaign_daily_summary cp  where cp.publisher_id in (544) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'Momo\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression,sum(click) as xad_click from campaign_daily_summary cp  where cp.publisher_id in (543) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'JD\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression, sum(click) as xad_click from campaign_daily_summary cp  where cp.publisher_id in (549) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'Zplay\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression,sum(click) as xad_click from campaign_daily_summary cp  where cp.publisher_id in (548) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp"
		+ " union all "
		+ "select timestamp as date, \'Sohu\' as publisher, sum(pub_gross_revenue) as xad_cost, sum(ad_impression) as xad_impression,sum(click) as xad_click from campaign_daily_summary cp  where cp.publisher_id in (551) and timestamp>=\'__startDate__ 00:00:00\' and timestamp<=\'__endDate__ 00:00:00\' group by timestamp;"

comparePublishersService.prototype.getXadMonetizationReport = function(startDate,
		endDate, callback) {
	var sumpublisherCostSQL = sumpublisherCostSQLTemplate.replace(/__startDate__/g, startDate.stdFormat()).replace(/__endDate__/g, endDate.stdFormat());
	redshiftDao.query(sumpublisherCostSQL, function(err, result) {
		if (err) {
			console.error("Failed to query xad data:" + JSON.stringify(err));
			callback(err, null);
		} else {
			for (var i=0; i<result.length;i++) {
				result[i].date=result[i].date.stdFormat() + ''; // make sure the date format is the same with the one returned from publisher.
			}
			console.log('Xad data is retrieved.');
			callback(null, result);
		}
	});

}

module.exports = new comparePublishersService();
