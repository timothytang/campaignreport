/**
 * http://usejsdoc.org/
 */
var redshiftDao = require('./../service/dao/commonRedshiftDao.js');

var campaignService = function() {
};

/**
 * @param campaignRequest
 *            Sample request:
 *            {"startDate":"2016-05-29","endDate":"2016-05-30",
 *            "groupBy":{"city":true,"adgroup":true,"app":true,
 *            "campaign":true,"creative":true,"creativeSize":true,
 *            "day":true,"hour":true,"iabCategory":true,"poi":true,
 *            "publisher":true},"campaignIds":"11","publisherIds":"11,112"}
 * 
 * @param callback
 */
campaignService.prototype.getCampaigns = function(campaignRequest, callback) {
	console.log(JSON.stringify(campaignRequest));
	var validationError = [];
	var campaignQuery = createCampaignQuery(campaignRequest);
	if (validationError.size > 0) {
		console.error(JSON.stringify(validationError))
		callback(validationError, null);
		return;
	}

	redshiftDao.query(campaignQuery, function(err, result) {
		callback(err, result);
	});
}

function createCampaignQuery(reportRequest, validationError) {
	console.log(JSON.stringify(reportRequest));
	var startDate = reportRequest.startDate;
	var endDate = reportRequest.endDate;
	var campaignIds = reportRequest.campaignIds;
	var publisherIds = reportRequest.publisherIds;

	// TODO: to add input validation.
	// Dates are required to limit the data.
	if (!startDate || !endDate) {
		validationError.push({
			'error' : 'Start date and End date are required!'
		})
		return '';
	}

	var groupBy = reportRequest.groupBy;
	var groupBySpecified = false;
	for ( var option in groupBy) {
		if (groupBy[option]) {
			groupBySpecified = true;
			break;
		}
	}
	if (!groupBySpecified) {
		validationError.push({
			'error' : 'One groupBy option must be specified at least!'
		})
		return '';
	}

	var entryTable = '';
	if (groupBy.hour) {
		entryTable = ' from Campaign_hourly_summary cs ';
		endDate = endDate + ' 23:00:00'; // including hours in the day if it
		// is by hour report.
	} else {
		entryTable = ' from Campaign_daily_summary cs ';
	}

	var whereCause = ' where ';
	if (startDate) {
		whereCause = whereCause + ' cs.timestamp>=\'' + startDate + '\' and ';
	}
	if (endDate) {
		whereCause = whereCause + ' cs.timestamp<=\'' + endDate + '\' and ';
	}
	if (campaignIds) {
		whereCause = whereCause + ' cs.campaign_id in (' + campaignIds
				+ ') and ';
	}
	if (publisherIds) {
		whereCause = whereCause + ' cs.publisher_id in (' + publisherIds
				+ ') and ';
	}
	whereCause = whereCause.slice(0, whereCause.length - 4);

	var selectCause = 'select ';
	var groupByCause = '';
	var joinCause = '';
	// At least one groupBy must be selected.
	if (groupBy.campaign) {
		groupByCause = groupByCause + 'camp.campaign_id,camp.campaign_name,';
		selectCause = selectCause + 'camp.campaign_id,camp.campaign_name,';
		joinCause = joinCause
				+ ' inner join campaign_dimension camp on cs.campaign_id=camp.campaign_id ';
	}

	if (groupBy.creative) {
		groupByCause = groupByCause
				+ 'creative.creative_id,creative.creative_name,';
		selectCause = selectCause
				+ 'creative.creative_id,creative.creative_name,';

		joinCause = joinCause
				+ ' inner join creative_dimension creative on cs.creative_id =creative.creative_id ';
	}

	if (groupBy.creativeSize) {
		groupByCause = groupByCause + ' cs.banner_size,';
		selectCause = selectCause + '  cs.banner_size,';
	}

	if (groupBy.adgroup) {
		selectCause = selectCause + 'ad.adgroup_id, ad.adgroup_name,';
		groupByCause = groupByCause + 'ad.adgroup_id, ad.adgroup_name,';

		joinCause = joinCause
				+ ' inner join adgroup_dimension ad on cs.adgroup_id=ad.adgroup_id ';
	}

	if (groupBy.hour || groupBy.day) {
		selectCause = selectCause + 'timestamp as campaign_time,';
		groupByCause = groupByCause + 'campaign_time,';

	}

	if (groupBy.city || groupBy.poi) {
		joinCause = joinCause
				+ ' inner join bizlocation_dimension location on cs.mslocation_id=location.location_id ';

		if (groupBy.poi) {
			selectCause = selectCause
					+ 'Case location.city when \'NULL\' then  cs.user_city else location.city end as location_city, location.address1, location.location_name, location.location_type,';
			groupByCause = groupByCause
					+ 'location_city, location.address1, location.location_name, location.location_type,';
		} else if (groupBy.city) {
			selectCause = selectCause
					+ 'Case location.city when \'NULL\' then  cs.user_city else location.city end as location_city,';
			groupByCause = groupByCause + 'location_city,';

		}
	}

	if (groupBy.publisher) {
		selectCause = selectCause + 'pub.publisher_id, pub.publisher_name,';
		groupByCause = groupByCause + 'pub.publisher_id, pub.publisher_name,';
		joinCause = joinCause
				+ ' inner join publisher_dimension pub on cs.publisher_id=pub.publisher_id ';
	}

	if (groupBy.app) {
		selectCause = selectCause + 'cs.traffic_src as app,';
		groupByCause = groupByCause + 'app,';
	}

	if (groupBy.iabCategory) {
		selectCause = selectCause
				+ 'cs.matched_supply_category as IAB_category,';
		groupByCause = groupByCause + 'IAB_category,';
	}

	selectCause = selectCause
			+ ' sum(xad_gross_revenue) as xad_revenue, sum(ad_impression) as impression, sum(click) as click,sum(pub_gross_revenue) as publisher_revenue '
	groupByCause = groupByCause.slice(0, groupByCause.length - 1);
	var orderCause = ' order by ' + groupByCause + ';';
	groupByCause = ' group by ' + groupByCause;

	var finalQuery = selectCause + entryTable + joinCause + whereCause
			+ groupByCause + orderCause;
	return finalQuery;

}

module.exports = new campaignService();
