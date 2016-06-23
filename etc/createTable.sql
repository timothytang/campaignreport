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

 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src) 
                             values(10000000001,541,50.1, 200.01,10000001,1001,'2016-06-13 00:00:00', 101,1848,301, ':weibo');
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000002,546,50.2, 200.02,10000002,1002,'2016-06-13 00:00:00', 102,202,302, ':wexin') ;  
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000003,536,50.3, 200.03,10000003,1003,'2016-06-13 00:00:00', 103,203,303,':qq') ;    
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000004,544,50.4,200.04,10000004,1004,'2016-06-13 00:00:00', 104,204,304,':com.reader') ;     
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000005,543,50.5, 200.05,10000005,1005,'2016-06-13 00:00:00', 1849,1849,305,':com.test') ;  
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000006,549,50.6, 200.06,10000006,1006,'2016-06-13 00:00:00', 106,206,306, ':com.abc') ;
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000007,548,50.7,200.07,10000007,1007,'2016-06-14 00:00:00', 107,207,307,':com.reader') ; 
 insert into Campaign_daily_summary(campaign_id,publisher_id,xad_gross_revenue, pub_gross_revenue,ad_impression,click,timestamp, creative_id, adgroup_id,mslocation_id, traffic_src)  
                             values(10000000008,551,50.8,200.08,10000008,1008,'2016-06-15 00:00:00', 108,1850,308,':com.reader') ;  


create table campaign_dimension
(campaign_id      		 bigint                 	,
 company_id       		 bigint                 	,
 company_name     		 character varying(128) 	,
 account_id       		 bigint                 	,
 account_name     		 character varying(128) 	,
 account_type     		 character varying(48)  	,
 market           		 character varying(10)  	,
 ad_vendor_id     		 bigint                 	,
 campaign_status  		 character varying(10)  	,
 campaign_name    		 character varying(256) 	,
 start_date       		 date                   	,
 end_date         		 date                   	,
 budget_type      		 character varying(256) 	,
 sales_manager    		 character varying(256) 	,
 ops_manager      		 character varying(256) 	,
 campaign_manager 		 character varying(256) 	,
 region_name      		 character varying(255) 	,
 subregion_name   		 character varying(255) 	);

insert into campaign_dimension(campaign_id, campaign_name) values(10000000001, 'Camp1');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000002, 'Camp2');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000003, 'Camp3');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000004, 'Camp4');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000005, 'Camp5');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000006, 'Camp6');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000007, 'Camp7');
insert into campaign_dimension(campaign_id, campaign_name) values(10000000008, 'Camp8');


create table adgroup_dimension
(campaign_id    	 bigint                 	,
 adgroup_id     	 bigint                 	,
 mobilesite_id  	 bigint                 	,
 market         	 character varying(10)  	,
 adgroup_name   	 character varying(256) 	,
 adgroup_status 	 character varying(10)  	,
 adgroup_type   	 character varying(10)  	,
 start_date     	 date                   	,
 end_date       	 date                   	,
 adv_bid_type   	 character varying(25)  	,
 adv_bid_rate   	 numeric(14,6)          	)

insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000001,1848,'group 1' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000002,202,'group 2' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000003,203,'group 3' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000004,204,'group 4' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000005,1849,'group 5' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000006,206,'group 6' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000007,207,'group 7' );
insert into adgroup_dimension (campaign_id, adgroup_id, adgroup_name) values(10000000008,1850,'group 8' );


create table creative_dimension
( creative_id        bigint                 	,
 adgroup_id        	 bigint                 	,
 creative_name     	 character varying(512) 	,
 creative_type     	 character varying(64)  	,
 landing_page_type 	 character varying(64)  	);

insert into creative_dimension (creative_id, adgroup_id,creative_name) values(101,201, 'Creative 1');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(102,202, 'Creative 2');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(103,203, 'Creative 3');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(104,204, 'Creative 4');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(105,205, 'Creative 5');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(106,206, 'Creative 6');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(107,207, 'Creative 7');
insert into creative_dimension (creative_id, adgroup_id,creative_name) values(108,208, 'Creative 8');


create table publisher_dimension
(publisher_id    	 bigint                 	,
 publisher_appid 	 character varying(45)  	,
 publisher_name  	 character varying(256) 	,
 publisher_tier  	 character varying(10)  	,
 publisher_type  	 character varying(10)  	,
 currency        	 character varying(3)   	);

insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (541, 'Weibo','Weibo');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (546, 'GDT1','GDT1');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (556, 'GDT2','GDT2');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (557, 'GDT3','GDT3');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (536, 'Adview1','Adview1');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (526, 'Adview2','Adview2');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (535, 'Adview3','Adview3');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (539, 'Adview4','Adview4');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (534, 'Adview5','Adview5');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (544, 'Xunfei','Xunfei');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (543, 'Momo','Momo');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (549, 'JD','JD');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (548, 'Zplay','Zplay');
insert into publisher_dimension(publisher_id,publisher_appid,publisher_name) values (551, 'Sohu','Sohu');


create table bizlocation_dimension
(location_id   	 bigint                 	,
 mobilesite_id 	 bigint                 	,
 location_type 	 character varying(255) 	,
 business_name 	 character varying(255) 	,
 location_name 	 character varying(255) 	,
 address1      	 character varying(255) 	,
 address2      	 character varying(255) 	,
 city          	 character varying(127) 	,
 state         	 character varying(127) 	,
 zipcode       	 character varying(127) 	,
 country       	 character varying(127) 	,
 latitude      	 numeric(14,6)          	,
 longitude     	 numeric(14,6)          	);


insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(301,1,'Local','Location1','addr1','Shanghai','Shanghai');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(302,2,'Local','Location2','addr2','Shanghai','Shanghai');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(303,3,'Local','Location3','addr3','Beijing','Beijing');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(304,4,'Local','Location4','addr4','Beijing','Beijing');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(305,5,'Local','Location5','addr5','Suzhou','Jiangsu');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(306,6,'Local','Location6','addr6','Changzhou','Jiangsu');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(307,7,'National','NULL','NULL','NULL','NULL');
insert into bizlocation_dimension(location_id, mobilesite_id,location_type,location_name,address1,city, state)
	values(308,8,'Local','Location1','addr1','Liyang','Jiangsu');

