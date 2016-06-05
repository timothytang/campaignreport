 create table Campaign_daily_summary(
 timestamp                	 timestamp without time zone 	,
 ad_vendor_id             	 bigint                      	,
 campaign_id              	 bigint                      	,
 adgroup_id               	 bigint                      	,
 creative_id              	 bigint                      	,
 mslocation_id            	 bigint                      	,
 publisher_id             	 bigint                      	,
 traffic_src              	 character varying(255)      	,
 keyword                  	 character varying(255)      	,
 user_city                	 character varying(127)      	,
 user_state               	 character varying(127)      	,
 user_zip                 	 character varying(10)       	,
 user_country             	 character varying(127)      	,
 age                      	 character varying(45)       	,
 gender                   	 character varying(45)       	,
 banner_size              	 character varying(45)       	,
 os                       	 character varying(45)       	,
 carrier                  	 character varying(128)      	,
 pub_type                 	 character varying(45)       	,
 device_type              	 character varying(45)       	,
 ad_returned              	 bigint                      	,
 ad_impression            	 bigint                      	,
 click                    	 bigint                      	,
 click_to_call            	 bigint                      	,
 call                     	 bigint                      	,
 map                      	 bigint                      	,
 directions               	 bigint                      	,
 review                   	 bigint                      	,
 moreinfo                 	 bigint                      	,
 description              	 bigint                      	,
 sms                      	 bigint                      	,
 website                  	 bigint                      	,
 arrival                  	 bigint                      	,
 checkin                  	 bigint                      	,
 save_to_ph_book          	 bigint                      	,
 save_to_app              	 bigint                      	,
 winbid                   	 bigint                      	,
 xad_gross_revenue        	 numeric(14,6)               	,
 pub_gross_revenue        	 numeric(14,6)               	,
 media                    	 bigint                      	,
 coupon                   	 bigint                      	,
 passbook                 	 bigint                      	,
 app_store                	 bigint                      	,
 total_calls              	 bigint                      	,
 tracking_cost            	 numeric(14,6)               	,
 creative_type            	 character varying(45)       	,
 matched_supply_category  	 character varying(45)       	,
 matched_user_category    	 character varying(45)       	,
 is_high_conf_sl          	 smallint                    	,
 listing_vendor_src       	 character varying(255)      	,
 adomain                  	 character varying(1024)     	,
 adv_imp_bid              	 numeric(14,6)               	,
 adv_click_bid            	 numeric(14,6)               	,
 pub_imp_bid              	 numeric(14,6)               	,
 footprints_sic           	 character varying(255)      	,
 footprints_brand         	 character varying(255)      	,
 footprints_business_hash 	 character varying(255)      	,
 geotarget_id             	 bigint                      	,
 uid_type                 	 character varying(32)       	,
 device_os_version        	 character varying(64)       	,
 device_make              	 character varying(64)       	,
 device_model             	 character varying(64)       	,
 device_year              	 smallint                    	,
 isp                      	 character varying(128)      	,
 video_start              	 bigint                      	,
 video_end                	 bigint                      	,
 neptune_bucket_id        	 integer                     	,
 rtb_bucket_id            	 integer                     	,
 buyer_id                 	 character varying(128)      	,
 dsp_id                   	 character varying(128)      	,
 deal_id                  	 character varying(128)      	,
 fp_proximity_mode        	 smallint                    	,
 matched_locaud_brand     	 character varying(255)      	,
 matched_locaud_category  	 character varying(255)      	,
 bundle                   	 character varying(128)      	,
 app_site_id              	 character varying(128)      	);

 insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000001,541, 200.01,10000001,1001,'2016-05-30 00:00:00');
 insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000002,546, 200.02,10000002,1002,'2016-05-30 00:00:00') ;  
 insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000003,536, 200.03,10000003,1003,'2016-05-30 00:00:00') ;    
 insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000004,544, 200.04,10000004,1004,'2016-05-30 00:00:00') ;     
 insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000005,543, 200.05,10000005,1005,'2016-05-30 00:00:00') ;  
insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000006,549, 200.06,10000006,1006,'2016-05-30 00:00:00') ;
insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000007,548, 200.07,10000007,1007,'2016-05-30 00:00:00') ; 
insert into Campaign_daily_summary(campaign_id,publisher_id, pub_gross_revenue,ad_impression,click,timestamp) 
                             values(10000000008,551, 200.08,10000008,1008,'2016-05-30 00:00:00') ;                                                         