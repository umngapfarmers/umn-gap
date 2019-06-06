INSERT INTO "public"."harvest_year"("harvest_id","harvest_year","farm_id")
VALUES
(1,2019,1);

INSERT INTO "public"."person"("person_id","person_first","person_last","person_status","user_id","current_harvest_id","farm_id")
VALUES
(1,E'Walter',E'Benson',TRUE,1,1,1),
(2,E'Chris',E'Borgen',TRUE,NULL,1,1),
(3,E'Kashif',E'Siddiqui',TRUE,NULL,1,1);

INSERT INTO "public"."farm_crop"("farm_crop_id","farm_crop_type","harvest_year_id","farm_crop_status")
VALUES
(1,E'potato',1,TRUE),
(3,E'parsnip',1,TRUE),
(4,E'broccoli',1,TRUE),
(5,E'celery',1,TRUE),
(6,E'beet',1,TRUE);

INSERT INTO "public"."farm_field"("farm_field_id","field_name","harvest_year_id","farm_field_status")
VALUES
(1,E'south',1,TRUE),
(2,E'west',1,TRUE),
(3,E'north',1,TRUE);

INSERT INTO "public"."label_code"("label_code_id","farm_crop_id","farm_field_id","harvest_year_id","label_code_text","label_code_status")
VALUES
(1,6,3,1,E'beet_NF',TRUE),
(2,4,3,1,E'broc_NF',TRUE),
(3,5,2,1,E'cel_WF',TRUE),
(4,3,1,1,E'pars_SF',TRUE),
(6,6,2,1,E'beet_WF',TRUE),
(7,1,3,1,E'pot_NF',TRUE),
(8,1,1,1,E'pot_SF',TRUE);


INSERT INTO "public"."farm_compost"("farm_compost_id","farm_compost_name","farm_compost_date","farm_compost_description","user_id","harvest_year_id","farm_compost_status")
VALUES
(1,E'pile1',E'2019-05-31 00:00:00',E'moldy hay, corn husks, chicken manure, apple cores, barley ',NULL,1,TRUE),
(2,E'pile2',E'2019-05-22 00:00:00',E'grass clippings, egg shells, hay,  chicken manure, cattle bedding',NULL,1,TRUE);

INSERT INTO "public"."compost"("compost_id","farm_compost_id","compost_turned","compost_date","test_area_1_temp","test_area_2_temp","test_area_3_temp","test_area_4_temp","label_code_id","compost_sig","user_id","harvest_year_id")
VALUES
(1,1,TRUE,E'2019-05-31 00:00:00',E'',E'',E'',E'',NULL,2,NULL,1),
(2,2,FALSE,E'2019-05-31 00:00:00',E'100',E'115',E'120',E'120',NULL,2,NULL,1),
(3,2,TRUE,E'2019-06-12 00:00:00',E'',E'',E'',E'',NULL,2,NULL,1),
(4,2,FALSE,E'2019-05-31 00:00:00',E'100',E'120',E'150',E'130',NULL,3,NULL,1),
(5,1,TRUE,E'2019-06-24 00:00:00',E'',E'',E'',E'',NULL,2,NULL,1),
(6,2,FALSE,E'2019-05-31 00:00:00',E'',E'',E'',E'',6,3,NULL,1),
(7,1,TRUE,E'2019-06-26 00:00:00',E'',E'',E'',E'',NULL,2,NULL,1),
(8,1,FALSE,E'2019-05-31 00:00:00',E'',E'',E'',E'',5,3,NULL,1),
(9,2,FALSE,E'2019-07-24 00:00:00',E'',E'',E'',E'',5,3,NULL,1),
(10,2,FALSE,E'2019-05-31 00:00:00',E'',E'',E'',E'',6,2,NULL,1),
(11,2,FALSE,E'2019-05-31 00:00:00',E'',E'',E'',E'',4,1,NULL,1);

INSERT INTO "public"."farm_water_source"("farm_water_source_id","farm_water_source_name","farm_water_status","harvest_year_id")
VALUES
(1,E'well1',TRUE,1),
(2,E'municipal',TRUE,1),
(3,E'pond',TRUE,1),
(4,E'well2',TRUE,1);

INSERT INTO "public"."farm_water"("farm_water_id","farm_water_source_id","farm_water_status","label_code_id","harvest_year_id")
VALUES
(1,4,TRUE,8,1),
(2,3,TRUE,6,1),
(3,2,TRUE,3,1),
(4,3,TRUE,3,1),
(5,4,TRUE,4,1),
(6,1,TRUE,2,1);

INSERT INTO "public"."farm_manure"("farm_manure_id","farm_manure_date","farm_manure_description","farm_manure_rate","label_code_id","harvest_year_id","farm_manure_status")
VALUES
(1,E'2019-05-31 00:00:00',E'well rotted cow dung, bedding etc.',E'190',8,1,TRUE),
(2,E'2019-05-31 00:00:00',E'cattle ',E'111',7,1,TRUE),
(3,E'2019-05-30 00:00:00',E'cattle ',E'55',4,1,TRUE),
(4,E'2019-05-15 00:00:00',E'horse',E'50',3,1,TRUE);

INSERT INTO "public"."water_inspection"("inspection_id","inspection_date","inspection_water_source","distribution","observation","inspection_corrective_action","inspection_signature","harvest_year_id")
VALUES
(1,E'2019-04-01 00:00:00',4,E'overhead drip',E'looks clear',E'collected sample for lab',1,1),
(2,E'2019-04-01 00:00:00',3,E'driip',E'animal signs around pond, some feaces',E'set out decoys, and fencing',3,1),
(3,E'2019-04-01 00:00:00',1,E'drip',E'looks fine',E'took sample and sent to lab',3,1);

