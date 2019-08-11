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
  "email" VARCHAR(255) NOT NULL,
  "user_role" VARCHAR (255) NOT NULL,
  "farm_registry_id" INT REFERENCES "farm_registry",
  "current_harvest_year" INT REFERENCES "harvest_year",
  "user_status" boolean DEFAULT TRUE,
  "password_recovery_token" VARCHAR (1000),
  "password_recovery_time" VARCHAR (1000)
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

------------------------ facilities ------------------------

--setup

CREATE TABLE "farm_packing"
(
  "farm_packing_id" serial primary key,
  "farm_packing_name" varchar(50),
  "harvest_year_id" int references "harvest_year",
  "farm_packing_status" boolean DEFAULT true

);

CREATE TABLE "farm_cooler"
(
  "farm_cooler_id" serial primary key,
  "farm_cooler_name" varchar(50),
  "harvest_year_id" int references "harvest_year",
  "farm_cooler_status" boolean DEFAULT true

);

CREATE TABLE "farm_bathroom"
(
  "farm_bathroom_id" serial primary key,
  "farm_bathroom_name" varchar(50),
  "harvest_year_id" int references "harvest_year",
  "farm_bathroom_status" boolean DEFAULT true
);

CREATE TABLE "farm_facility_other"
(
  "farm_facility_other_id" serial primary key,
  "farm_facility_other_name" varchar(50),
  "harvest_year_id" int references "harvest_year",
  "farm_facility_other_status" boolean DEFAULT true
);

--logs

CREATE TABLE "packing"
(
  "packing_id" serial primary key ,
  "farm_packing_id" int references  "farm_packing",
  "packing_date" timestamptz NOT NULL,
  "packing_cleaned" boolean,
  "packing_sanitized" boolean,
  "packing_area" varchar(50) ,
  "packing_comment" varchar(100),
  "packing_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "cooler"
(
  "cooler_id" serial primary key ,
  "farm_cooler_id" int references  "farm_cooler",
  "cooler_date" timestamptz NOT NULL,
  "cooler_temperature" varchar(50),
  "cooler_cleaned" boolean,
  "cooler_sanitized" boolean,
  "cooler_area" varchar(50) ,
  "cooler_comment" varchar(100),
  "cooler_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "bathroom"
(
  "bathroom_id" serial primary key ,
  "farm_bathroom_id" int references  "farm_bathroom",
  "bathroom_date" timestamptz NOT NULL,
  "bathroom_cleaned" boolean,
  "bathroom_sanitized" boolean,
  "bathroom_area" varchar(50) ,
  "bathroom_comment" varchar(100),
  "bathroom_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "facility_other"
(
  "facility_other_id" serial primary key,
  "farm_facility_other_id" int references "farm_facility_other" NOT NULL,
  "facility_other_date" timestamptz NOT NULL,
  "facility_other_cleaned" boolean,
  "facility_other_sanitized" boolean,
  "facility_other_area" varchar(50) ,
  "facility_other_comment" varchar(100),
  "facility_other_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);


------------------------ equipment ------------------------

-- setup

CREATE TABLE "farm_tool"
(
  "farm_tool_id" serial primary key,
  "farm_tool_name" varchar(50) NOT NULL,
  "harvest_year_id" int references "harvest_year",
  "farm_tool_status" boolean DEFAULT true
);

CREATE TABLE "farm_equipment_other"
(
  "farm_equipment_other_id" serial primary key,
  "farm_equipment_other_name" varchar(50),
  "harvest_year_id" int references "harvest_year",
  "farm_equipment_other_status" boolean DEFAULT true
);

CREATE TABLE "farm_vehicle"
(
  "farm_vehicle_id" serial primary key,
  "farm_vehicle_name" varchar(50) NOT NULL,
  "harvest_year_id" int references "harvest_year",
  "farm_vehicle_status" boolean DEFAULT true
);

CREATE TABLE "farm_firstaid"
(
  "farm_firstaid_id" serial primary key,
  "farm_firstaid_location" varchar(50) NOT NULL,
  "harvest_year_id" int references "harvest_year",
  "farm_firstaid_status" boolean DEFAULT true
);

CREATE TABLE "farm_pest"
(
  "farm_pest_id" serial primary key,
  "farm_pest_type" varchar(50) NOT NULL,
  "farm_pest_location" varchar(50) NOT NULL,
  "harvest_year_id" int references "harvest_year",
  "farm_pest_status" boolean DEFAULT true
);

CREATE TABLE "farm_thermometer"
(
  "farm_thermometer_id" serial primary key,
  "farm_thermometer_location" varchar(50) NOT NULL,
  "harvest_year_id" int references "harvest_year",
  "farm_thermometer_status" boolean DEFAULT true
);

-- logs 
CREATE TABLE "tool"
(
  "tool_id" serial primary key,
  "farm_tool_id" int references "farm_tool",
  "tool_date" TIMESTAMPTZ NOT NULL,
  "tool_sanitized" boolean,
  "tool_cleaned" boolean,
  "tool_comment" varchar(200),
  "tool_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "equipment_other"
(
  "equipment_other_id" serial primary key,
  "farm_equipment_other_id" int references "farm_equipment_other",
  "equipment_other_comment" varchar(200),
  "equipment_other_date" TIMESTAMPTZ,
  "equipment_other_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "vehicle"
(
  "vehicle_id" serial primary key,
  "farm_vehicle_id" int references "farm_vehicle",
  "vehicle_date" TIMESTAMPTZ NOT NULL,
  "vehicle_cleaned" boolean,
  "vehicle_comment" varchar(200),
  "vehicle_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "firstaid"
(
  "firstaid_id" serial primary key,
  "farm_firstaid_id" int references "farm_firstaid",
  "firstaid_date" TIMESTAMPTZ,
  "firstaid_stocked" boolean,
  "firstaid_comment" varchar(200),
  "firstaid_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "pest"
(
  "pest_id" serial primary key,
  "pest_administrator" varchar(200),
  "farm_pest_id" int references "farm_pest",
  "pest_date" TIMESTAMPTZ,
  "pest_comment" varchar(200),
  "pest_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);

CREATE TABLE "thermometer"
(
  "thermometer_id" serial primary key,
  "farm_thermometer_id" int references "farm_thermometer",
  "thermometer_date" TIMESTAMPTZ,
  "thermometer_calibrate" boolean,
  "thermometer_comment" varchar(200),
  "thermometer_sig" int references "person",
  "harvest_year_id" int references "harvest_year"
);