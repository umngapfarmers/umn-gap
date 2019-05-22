
----------------------------- Create registry, user, harvest_year info first -------------------------
CREATE TABLE "farm_registry"
(
  "farm_id" SERIAL PRIMARY KEY,
  "farm_name" VARCHAR (255) NOT NULL,
  "address" VARCHAR (255) NOT NULL,
  "city" VARCHAR (100) NOT NULL,
  "state" VARCHAR (50) NOT NULL,
  "zip_code" VARCHAR (50) NOT NULL
);

CREATE TABLE "harvest_year"
(
  "harvest_id" SERIAL PRIMARY KEY,
  "harvest_year" INT,
  "farm_id" INT REFERENCES "farm_registry"
);



CREATE TABLE "user"
(
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar(50) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "user_role" VARCHAR (255) NOT NULL,
  "farm_registry_id" INT REFERENCES "farm_registry",
  "current_harvest_year" INT REFERENCES "harvest_year"
);





------------------------ person and employee training ----------------------

CREATE TABLE "person"
(
  "person_id" serial primary key,
  "person_first" varchar(50),
  "person_last" varchar(50),
  "person_status" boolean DEFAULT true,
  "user_id" INT REFERENCES "user",
  "current_harvest_id" INT REFERENCES "harvest_year",
  "farm_id" INT REFERENCES "farm_registry"
);

CREATE TABLE "employee_training"
(
  "employee_training_id" SERIAL PRIMARY KEY,
  "topic" VARCHAR (500) NOT NULL,
  "person_id" INT REFERENCES "person" NOT NULL,
  "trainer_name" VARCHAR (255) NOT NULL,
  "date_trained" date NOT NULL,
  "employee_training_sig" VARCHAR (200),
  "harvest_year_id" INT REFERENCES "harvest_year"
);


------------------------- Farm Setup and logs -------------------------

------------------------fields and crops ------------------------

-- setup
CREATE TABLE "farm_field"
(
  "farm_field_id" SERIAL PRIMARY KEY,
  "field_name" VARCHAR (255) NOT NULL,
  "harvest_year_id" INT REFERENCES "harvest_year",
  "farm_field_status" boolean DEFAULT true
);

CREATE TABLE "farm_crop"
(
  "farm_crop_id" SERIAL PRIMARY KEY,
  "farm_crop_type" VARCHAR (255) NOT NULL,
  "harvest_year_id" INT REFERENCES "harvest_year",
  "farm_crop_status" boolean DEFAULT true
);

CREATE TABLE "label_code"
(
  "label_code_id" serial primary key,
  "farm_crop_id" int references "farm_crop",
  "farm_field_id" int references "farm_field",
  "harvest_year_id" int references "harvest_year",
  "label_code_text" varchar(200)
);

-- logs
CREATE TABLE "crop_harvest"
(
  "crop_harvest_id" serial primary key,
  "crop_harvest_date" timestamp NOT NULL,
  "crop_harvest_amount" varchar(50),
  "crop_harvest_sig" varchar(200),
  "label_code_id" int references "label_code",
  "user_id" int references "user"
);

------------------------ manure and compost ------------------------

-- setup
CREATE TABLE "farm_manure"
(
  "farm_manure_id" SERIAL PRIMARY KEY,
  "farm_manure_date" timestamp NOT NULL,
  "farm_manure_description" VARCHAR(255) NOT NULL,
  "farm_manure_rate" VARCHAR(255) ,
  "label_code_id" INT REFERENCES "label_code",
  "harvest_year_id" INT REFERENCES "harvest_year",
  "farm_manure_status" boolean DEFAULT true
);

CREATE TABLE "farm_compost"
(
  "farm_compost_id" SERIAL PRIMARY KEY,
  "farm_compost_name" varchar (200) NOT NULL,
  "farm_compost_date" timestamp,
  "farm_compost_description" varchar (250),
  "user_id" INT REFERENCES "user",
  "harvest_year_id" INT REFERENCES "harvest_year",
  "farm_compost_status" boolean DEFAULT true
);

-- logs
CREATE TABLE "compost"
(
  "compost_id" SERIAL PRIMARY KEY,
  "farm_compost_id" INT REFERENCES "farm_compost",
  "compost_turned" boolean DEFAULT false,
  "compost_date" timestamp,
  "test_area_1_temp" VARCHAR (15),
  "test_area_2_temp" VARCHAR (15),
  "test_area_3_temp" VARCHAR (15),
  "test_area_4_temp" VARCHAR (15),
  "label_code_id" INT REFERENCES "label_code",
  "compost_sig" VARCHAR (200),
  "user_id" INT REFERENCES "user",
  "harvest_year_id" INT REFERENCES "harvest_year"
);

------------------------ water ------------------------

--setup
CREATE TABLE "farm_water_source"
(
  "farm_water_source_id" serial primary key,
  "farm_water_source_name" Varchar (255),
  "farm_water_status" boolean DEFAULT true,
  "harvest_year_id" int references "harvest_year"
  -- does this need to be many-many?
);
CREATE TABLE "farm_water"
(
  "farm_water_id" serial primary key,
  "farm_water_source_id" int references "farm_water_source",
  "farm_water_status" boolean DEFAULT true,
  "label_code_id" int references "label_code",
  "harvest_year_id" int references "harvest_year"

);

-- logs
CREATE TABLE "water_inspection"
(
  "treatment_id" serial primary key,
  "treatment_date" timestamp Not Null,
  "water_ph" varchar (255),
  "water_temp" varchar (255),
  "turbidity" varchar (255),
  "sanitizer" varchar (200),
  "corrective_action" varchar (200),
  "user_id" INT REFERENCES "user",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "water_treatment"
(
  "treatment_id" serial primary key,
  "treatment_date" timestamp Not Null,
  "farm_water_id" int references "farm_water",
  "water_ph" varchar(10),
  "water_temp" varchar(10),
  "turbidity" varchar(10),
  "sanitizer" varchar(75),
  "corrective_action" varchar(255),
  "treatment_sig" Varchar(200),
  "user_id" INT REFERENCES "user",
  "harvest_year_id" int references "harvest_year"
);



----------------------------------------------------------------------
---------------------------- Initial data ----------------------------
----------------------------------------------------------------------

--"farm_registry"

-- INSERT INTO "farm_registry"
--   ("farm_name", "address", "city", "state", "zip_code")
-- VALUES
--   ('Farmy McFarm', '0000 A Real Place', 'Farm Town', 'MN', 55555);

-- -- "user"
-- INSERT INTO "user"
--   ("username", "password", "user_role", "farm_registry_id")
-- VALUES
--   ('admin', 'CHANGE TO REAL HASH', 'admin', 1);

-- -- "harvest_year"
-- INSERT INTO "harvest_year"
--   ("harvest_year", "farm_id")
-- VALUES
--   ('2019', '1');

-- -- "person"
-- INSERT INTO "person"
--   ("person_first", "person_last", "person_status", "user_id")
-- VALUES
--   ('Walter', 'Benson', 'true', '1');

-- -- "employee_training"
-- INSERT INTO "employee_training"
--   ("topic", "person_id", "trainer_name", "date_trained", "employee_training_sig", "harvest_year_id")
-- VALUES
--   ('Good agricultural practices', '1', 'Farmy Farmer', '2018-05-05', 'Walter Benson', '1');


-- ------------------------harvest tracebility------------------------
-- --setup

-- -- "farm_field"
-- INSERT INTO "farm_field"
--   ("field_name", "harvest_year_id", "farm_field_status")
-- VALUES
--   ('North Field', '1', 'true');

-- -- "farm_crop"
-- INSERT INTO "farm_crop"
--   ("farm_crop_type", "harvest_year_id", "farm_crop_status")
-- VALUES
--   ('tomatoes', '1', 'true');

-- -- "label_code"
-- INSERT INTO "label_code"
--   ("farm_crop_id", "farm_field_id", "label_code_text","harvest_year_id")
-- VALUES
--   ('1', '1', 'NF_tom', '1');

-- --logs

-- --"crop_harvest"
-- INSERT INTO "crop_harvest"
--   ("crop_harvest_date", "crop_harvest_amount", "crop_harvest_sig", "label_code_id", "user_id")
-- VALUES
--   ('2018-08-08 04:05:06', '100 lbs', 'WB', '1', '1');

-- ------------------------ manure and compost ------------------------

-- -- setup

-- --"farm_manure"
-- INSERT INTO "farm_manure"
--   ("farm_manure_date", "farm_manure_description", "farm_manure_rate", "label_code_id", "harvest_year_id","farm_manure_status")
-- VALUES
--   ('2018-03-08 04:05:06', 'Manure from the manure store', 'much', '1', '1', 'true');

-- -- "farm_compost"
-- INSERT INTO "farm_compost"
--   ("farm_compost_name", "farm_compost_date", "farm_compost_description", "user_id", "harvest_year_id","farm_compost_status")
-- VALUES
--   ('pile 1', '2018-03-08 04:05:06', 'random veg and stuff', '1', '1', 'true');

-- --logs

-- --"compost"
-- INSERT INTO "compost"
--   ("farm_compost_id", "compost_turned", "compost_date", "test_area_1_temp","test_area_2_temp", "test_area_3_temp", "test_area_4_temp","label_code_id","compost_sig","user_id","harvest_year_id")
-- VALUES
--   ('1', 'true', '2018-04-08 04:05:06', '', '', '', '', '1', 'WB', '1', '1');


-- ------------------------ water ------------------------

-- --setup

-- -- "farm_water"
--  INSERT INTO "farm_water_source"
--   ("farm_water_source_name", "farm_water_status", "harvest_year_id")
-- VALUES
--   ('pond', 'true', '1');
-- INSERT INTO "farm_water"
--   ("farm_water_source_id", "farm_water_status", "label_code_id", "harvest_year_id")
-- VALUES
--   ('1', 'true', '1', '1');



-- -- logs

-- -- -- "water_inspection"
-- -- INSERT INTO "water_inspection" ("treatment_date", "water_ph", "water_temp", "turbidity", "sanitizer", "corrective_action","user_id","harvest_year_id" )
-- -- VALUES ('2018-04-08 04:05:06', '7.1', '', '', '', '','1','1');

-- -- -- "water_treatment"
-- -- INSERT INTO "water_inspection" ("treatment_date", "water_ph", "water_temp", "turbidity", "sanitizer", "corrective_action","user_id","harvest_year_id" )
-- -- VALUES ('2018-04-08 04:05:06', '7.1', '', '', '', '','1','1');



