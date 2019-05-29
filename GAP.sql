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
  -------should this be a true date or just an int?
  "farm_id" INT REFERENCES "farm_registry"
);

CREATE TABLE "user"
(
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar(50) UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "user_role" VARCHAR (255) NOT NULL,
  "farm_registry_id" INT REFERENCES "farm_registry",
  "current_harvest_year" INT REFERENCES "harvest_year",
  "user_status" boolean DEFAULT TRUE
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
  "employee_training_sig" int references "person",
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
  "label_code_text" varchar(200),
  "label_code_status" boolean DEFAULT true
);

-- logs
CREATE TABLE "crop_harvest"
(
  "crop_harvest_id" serial primary key,
  "crop_harvest_date" timestamp NOT NULL,
  "crop_harvest_amount" varchar(50),
  "crop_harvest_sig" int references "person",
  "label_code_id" int references "label_code",
  "harvest_year_id" int references "harvest_year"
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
  "compost_sig" int references "person",
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
  "inspection_id" serial primary key,
  "inspection_date" timestamp Not Null,
  "inspection_water_source" INT REFERENCES "farm_water_source",
  "distribution" varchar (255),
  "observation" varchar (500),
  "inspection_corrective_action" varchar (500),
  "inspection_signature" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "water_treatment"
(
  "treatment_id" serial primary key,
  "treatment_date" timestamp Not Null,
  "farm_water_source_id" int references "farm_water_source",
  "water_ph" varchar(10),
  "water_temp" varchar(10),
  "turbidity" varchar(10),
  "sanitizer" varchar(75),
  "corrective_action" varchar(255),
  "treatment_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);


SELECT "farm_compost"."farm_compost_name" as "pile name", "compost"."compost_turned" as "turned", 
  "compost"."compost_date" as "log date", "compost"."test_area_1_temp" as "area 1 temp", 
  "compost"."test_area_2_temp"as "area 2 temp", "compost"."test_area_3_temp" as "area 3 temp", 
  "compost"."test_area_4_temp" as "area 4 temp", "person"."person_first"as "sig first", 
  "person"."person_last" as "sig first", "label_code"."label_code_text" FROM "compost" 
  JOIN "farm_compost" on "farm_compost"."farm_compost_id" = "compost"."farm_compost_id"
  JOIN "label_code" ON "compost"."label_code_id" = "label_code"."label_code_id" 
  JOIN "person" on "compost"."compost_sig" = "person"."person_id" 
  WHERE "crop_harvest"."harvest_year_id" = 3 ORDER BY "compost"."compost_date" ASC;

SELECT "farm_compost"."farm_compost_name" as "compost name", 
  "farm_compost"."farm_compost_date" as "start date", 
  "farm_compost"."farm_compost_description" as "ingredients", 
  "farm_compost"."farm_compost_status" as "active"
  FROM "farm_compost"
  WHERE "farm_compost"."harvest_year_id" = 3 
  ORDER BY "farm_compost"."farm_compost_date" ASC;


SELECT "label_code"."label_code_text" as "label code",
  "farm_crop"."farm_crop_type" as "crop",
  "farm_field"."field_name" as "field"
  FROM "label_code" 
  JOIN "farm_crop" ON "label_code"."farm_crop_id" = "farm_crop"."farm_crop_id" 
  JOIN "farm_field" ON "label_code"."farm_field_id" = "farm_field"."farm_field_id"
  WHERE "label_code"."harvest_year_id" = $1
  ORDER BY "farm_crop"."farm_crop_id" ASC;

SELECT "farm_manure"."farm_manure_date" as "date applied", 
  "farm_manure"."farm_manure_description" as "description", 
  "farm_manure"."farm_manure_rate" as "rate applied",
  "label_code"."label_code_text" as "label code"
  FROM "farm_manure" JOIN "label_code" ON "label_code"."label_code_id" = "farm_manure"."label_code_id"
  WHERE "farm_manure"."harvest_year_id" = 1
  ORDER BY "farm_manure"."farm_manure_date" ASC;

SELECT "farm_water_source"."farm_water_source_name" as "source name", 
  "farm_water_source"."farm_water_status" as "active", 
  FROM "farm_water_source"
  WHERE "farm_water_source"."harvest_year_id" = 1;