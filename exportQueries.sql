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

SELECT "farm_water_source"."farm_water_source_name" as "source name",
  "label_code"."label_code_text" as "label code",
  "farm_water"."farm_water_status" as "is active" FROM "farm_water"
  JOIN "farm_water_source" ON "farm_water_source"."farm_water_source_id" = "farm_water"."farm_water_source_id"
  JOIN "label_code" on "label_code"."label_code_id" = "farm_water"."label_code_id"
  WHERE "farm_water"."harvest_year_id" = $1;

SELECT "employee_training"."topic",
  "person"."person_first" as "first name",
  "person"."person_last" as "last name",
  "employee_training"."trainer_name" as "trainer",
  "employee_training"."date_trained" as "date trained"
    FROM "employee_training"
  JOIN "person" on "employee_training"."person_id" = "person"."person_id"
  WHERE "employee_training"."harvest_year_id"=1;


SELECT "water_inspection"."inspection_date" as "date",
  "farm_water_source"."farm_water_source_name" as "source",
  "water_inspection"."distribution" as "distribution",
  "water_inspection"."observation" as "observation",
  "water_inspection"."inspection_corrective_action" as "corrective action",
  "person"."person_first" as "sig first",
  "person"."person_last" as "sig last"
  FROM "water_inspection"
  JOIN "farm_water_source" on "farm_water_source"."farm_water_source_id" = 	"water_inspection"."inspection_water_source"
  JOIN "person" on "person"."person_id" = "water_inspection"."inspection_signature"
  WHERE "water_inspection"."harvest_year_id" = 1;


SELECT "water_treatment"."treatment_date" as "date",
            "farm_water_source"."farm_water_source_name" as "source",
            "water_treatment"."water_ph" as "pH",
            "water_treatment"."water_temp" as "temp",
            "water_treatment"."turbidity" as "turbidity",
            "water_treatment"."sanitizer" as "sanitizer",
            "water_treatment"."corrective_action" as "corrective action",
            concat("person"."person_first", ' ' , "person"."person_last") as "signature"
            FROM "water_treatment"
            JOIN "farm_water_source" on "farm_water_source"."farm_water_source_id" =  "water_treatment"."farm_water_source_id"
            JOIN "person" on "person"."person_id" = "water_treatment"."treatment_sig"
            WHERE "water_treatment"."harvest_year_id" = $1;

SELECT "tool"."tool_date" as "date", 
      "farm_tool"."farm_tool_name" as "tool", 
       "tool"."tool_sanitized" as "sanitized", 
       "tool"."tool_cleaned" as "cleaned", 
       "tool"."tool_comment" as "comment", 
       "tool"."tool_sig" as "signature"
      FROM "tool"
      JOIN "farm_tool" on "farm_tool"."farm_tool_id" = "tool"."farm_tool_id"
      JOIN "person" on "person"."person_id" = "tool"."tool_sig"
      WHERE "tool"."harvest_year_id" = $1;



