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

-- presentation data

