const harvestQuery =
  `SELECT "crop_harvest"."crop_harvest_date" as "harvest date", 
        "crop_harvest"."crop_harvest_amount" as "harvest amount", 
        concat("person"."person_first", ' ' , "person"."person_last") as "signature",
        "label_code"."label_code_text" as "label code"
        FROM "crop_harvest" 
        JOIN "label_code" ON "crop_harvest"."label_code_id" = "label_code"."label_code_id" 
        JOIN "person" on "crop_harvest"."crop_harvest_sig" = "person"."person_id" WHERE "crop_harvest"."harvest_year_id" = $1 
        ORDER BY "crop_harvest"."crop_harvest_date" ASC;`

const compostTreatmentQuery = 
      `SELECT "farm_compost"."farm_compost_name" as "pile name", 
          "compost"."compost_turned" as "turned", 
          "compost"."compost_date" as "log date", 
          "compost"."test_area_1_temp" as "area 1 temp", 
          "compost"."test_area_2_temp"as "area 2 temp", 
          "compost"."test_area_3_temp" as "area 3 temp", 
          "compost"."test_area_4_temp" as "area 4 temp", 
          concat("person"."person_first", ' ' , "person"."person_last") as "signature"
          FROM "compost" 
          JOIN "farm_compost" on "farm_compost"."farm_compost_id" = "compost"."farm_compost_id"
          JOIN "person" on "compost"."compost_sig" = "person"."person_id" 
          WHERE "compost"."harvest_year_id" = $1 
          ORDER BY "compost"."compost_date" ASC;`
  
const farmCompostQuery = 
      `SELECT "farm_compost"."farm_compost_name" as "compost name", 
          "farm_compost"."farm_compost_date" as "start date", 
          "farm_compost"."farm_compost_description" as "ingredients", 
          "farm_compost"."farm_compost_status" as "is active"
          FROM "farm_compost"
          WHERE "farm_compost"."harvest_year_id" = $1 
          ORDER BY "farm_compost"."farm_compost_date" ASC;`

const labelCodeQuery = 
      `SELECT "label_code"."label_code_text" as "label code",
          "farm_crop"."farm_crop_type" as "crop",
          "farm_field"."field_name" as "field"
          FROM "label_code" 
          JOIN "farm_crop" ON "label_code"."farm_crop_id" = "farm_crop"."farm_crop_id" 
          JOIN "farm_field" ON "label_code"."farm_field_id" = "farm_field"."farm_field_id"
          WHERE "label_code"."harvest_year_id" = $1
          ORDER BY "farm_crop"."farm_crop_id" ASC;`

const farmManureQuery = 
      `SELECT "farm_manure"."farm_manure_date" as "date applied", 
          "farm_manure"."farm_manure_description" as "description", 
          "farm_manure"."farm_manure_rate" as "rate applied",
          "label_code"."label_code_text" as "label code",
          "farm_manure"."farm_manure_status" as "is active"
          FROM "farm_manure" JOIN "label_code" ON "label_code"."label_code_id" = "farm_manure"."label_code_id"
          WHERE "farm_manure"."harvest_year_id" = $1
          ORDER BY "farm_manure"."farm_manure_date" ASC;`

const farmWaterSourceQuery = 
      `SELECT "farm_water_source"."farm_water_source_name" as "source name", 
          "farm_water_source"."farm_water_status" as "is active"
          FROM "farm_water_source"
          WHERE "farm_water_source"."harvest_year_id" = $1;`

const farmWaterQuery = 
      `SELECT "farm_water_source"."farm_water_source_name" as "source name",
          "label_code"."label_code_text" as "label code",
          "farm_water"."farm_water_status" as "is active" FROM "farm_water"
          JOIN "farm_water_source" ON "farm_water_source"."farm_water_source_id" = "farm_water"."farm_water_source_id"
          JOIN "label_code" on "label_code"."label_code_id" = "farm_water"."label_code_id"
          WHERE "farm_water"."harvest_year_id" = $1;`

const trainingQuery = 
      `   SELECT "employee_training"."topic",
            concat("person"."person_first", ' ' , "person"."person_last") as "name",

            "employee_training"."trainer_name" as "trainer",
            "employee_training"."date_trained" as "date trained"
          FROM "employee_training"
          JOIN "person" on "employee_training"."person_id" = "person"."person_id"
          WHERE "employee_training"."harvest_year_id"=$1;`

const waterInspectionQuery = 
      `   SELECT "water_inspection"."inspection_date" as "date",
            "farm_water_source"."farm_water_source_name" as "source",
            "water_inspection"."distribution" as "distribution",
            "water_inspection"."observation" as "observation",
            "water_inspection"."inspection_corrective_action" as "corrective action",
          concat("person"."person_first", ' ' , "person"."person_last") as "signature"
          FROM "water_inspection"
          JOIN "farm_water_source" on "farm_water_source"."farm_water_source_id" = "water_inspection"."inspection_water_source"
          JOIN "person" on "person"."person_id" = "water_inspection"."inspection_signature"
          WHERE "water_inspection"."harvest_year_id" = $1;`

const waterTreatmentQuery = `
          SELECT "water_treatment"."treatment_date" as "date",
            "farm_water_source"."farm_water_source_name" as "source",
            "water_treatment"."water_ph" as "pH",
            "water_treatment"."water_temp" as "temp",
            "water_treatment"."turbidity" as "turbidity",
            "water_treatment"."sanitizer" as "sanitizer",
            "water_treatment"."corrective_action" as "corrective action",
            concat("person"."person_first", ' ' , "person"."person_last") as "signature" 
          FROM "water_treatment" 
          JOIN "farm_water_source" on "farm_water_source"."farm_water_source_id" = "water_treatment"."farm_water_source_id" 
          JOIN "person" on "person"."person_id" = "water_treatment"."treatment_sig" 
          WHERE "water_treatment"."harvest_year_id" = $1;`

const toolLogQuery = `   
          SELECT "tool"."tool_date" as "date", 
            "farm_tool"."farm_tool_name" as "tool", 
            "tool"."tool_sanitized" as "sanitized", 
            "tool"."tool_cleaned" as "cleaned", 
            "tool"."tool_comment" as "comment", 
            concat("person"."person_first", ' ' , "person"."person_last") as "signature" 
          FROM "tool"
          JOIN "farm_tool" on "farm_tool"."farm_tool_id" = "tool"."farm_tool_id"
          JOIN "person" on "person"."person_id" = "tool"."tool_sig"
          WHERE "tool"."harvest_year_id" = $1;`
  
const toolListQuery = 
          `SELECT "farm_tool"."farm_tool_name" as "name", "farm_tool"."farm_tool_status" as "active" 
          FROM "farm_tool" WHERE "farm_tool"."harvest_year_id" = $1;`

const vehicleListQuery = `
      SELECT "farm_vehicle"."farm_vehicle_name" as "name", 
      "farm_vehicle"."farm_vehicle_status" as "active" 
      FROM "farm_vehicle"
      WHERE "farm_vehicle"."harvest_year_id" = $1;`

const vehicleLogQuery = `
      SELECT "vehicle"."vehicle_date" as "date", 
        "farm_vehicle"."farm_vehicle_name" as "vehicle", 
        "vehicle"."vehicle_cleaned" as "cleaned",
        "vehicle"."vehicle_comment" as "comment",
        concat("person"."person_first", ' ' , "person"."person_last") as "signature"
      FROM "vehicle"
      JOIN "person" on "person"."person_id" = "vehicle"."vehicle_sig"
      JOIN "farm_vehicle" on "farm_vehicle"."farm_vehicle_id" = "vehicle"."farm_vehicle_id"
      WHERE "vehicle"."harvest_year_id" = $1;`

const thermometerListQuery = `
      SELECT "farm_thermometer".farm_thermometer_location as "location",
        "farm_thermometer".farm_thermometer_status as "active"
      FROM "farm_thermometer"
      WHERE "farm_thermometer"."harvest_year_id" = $1;`

const thermometerLogQuery = `
      SELECT "thermometer".thermometer_date as "date",
        "farm_thermometer".farm_thermometer_location as "location",
        "thermometer".thermometer_calibrate as "calibrated",
        "thermometer".thermometer_comment as "comment",
        concat("person"."person_first", ' ' , "person"."person_last") as "signature"
      FROM "thermometer"
      JOIN "person" on "person"."person_id" = "thermometer"."thermometer_sig"
      JOIN "farm_thermometer" on "farm_thermometer".farm_thermometer_id = "thermometer".farm_thermometer_id
      WHERE "thermometer".harvest_year_id = $1;`

const firstaidListQuery = `
      SELECT "farm_firstaid".farm_firstaid_location as "location",
        "farm_firstaid".farm_firstaid_status as "active"
      FROM "farm_firstaid"
      WHERE "farm_firstaid".harvest_year_id = $1;`

const firstaidLogQuery = `
      SELECT "firstaid".firstaid_date as "date",
        "farm_firstaid".farm_firstaid_location as "location",
        "firstaid".firstaid_stocked as "stocked",
        "firstaid".firstaid_comment as "comment",
        concat("person"."person_first", ' ', "person"."person_last") as "signature"
      FROM "firstaid"
      JOIN "person"
      on "person".
      "person_id" = "firstaid".
      "firstaid_sig"
      JOIN "farm_firstaid"
      on "firstaid".farm_firstaid_id = "farm_firstaid".farm_firstaid_id
      WHERE "firstaid".harvest_year_id = $1;`

const pestListQuery = `
      SELECT "farm_pest".farm_pest_location as "location",
        "farm_pest_type" as "type",
        "farm_pest_status" as "active"
      FROM "farm_pest"
      WHERE "harvest_year_id" = $1;`

const pestLogQuery = `
      SELECT "pest".pest_date as "date",
        "farm_pest".farm_pest_location as "location",
        "pest".pest_administrator as "adminstrator",
        "pest".pest_comment as "comment",
        concat("person".
        "person_first", ' ', "person".
        "person_last") as "signature"
      FROM "pest"
      JOIN "person"
      on "person".
      "person_id" = "pest".
      "pest_sig"
      JOIN "farm_pest"
      on "farm_pest".farm_pest_id = "pest".farm_pest_id
      WHERE "pest".harvest_year_id = $1;
      `
const otherEquipmentListQuery = `
      SELECT "farm_equipment_other".farm_equipment_other_name as "name",
        "farm_equipment_other".farm_equipment_other_status as "active"
      FROM "farm_equipment_other"
      WHERE "farm_equipment_other"."harvest_year_id" = $1;`

const otherEquipmentLogQuery = `
      SELECT "equipment_other".equipment_other_date as "date",
        "farm_equipment_other".farm_equipment_other_name as "name",
        "equipment_other".equipment_other_comment as "comment",
        concat("person".
          "person_first", ' ', "person".
          "person_last") as "signature"
      FROM "equipment_other"
      JOIN "farm_equipment_other"
      on "farm_equipment_other".farm_equipment_other_id = "equipment_other".farm_equipment_other_id
      JOIN "person"
      on "person".
      "person_id" = "equipment_other".
      "equipment_other_sig"
      WHERE "equipment_other"."harvest_year_id" = $1;
      `
const bathroomListQuery = `
      SELECT "farm_bathroom".farm_bathroom_name as "name",
        "farm_bathroom".farm_bathroom_status as "active"
      FROM "farm_bathroom"
      WHERE "farm_bathroom".harvest_year_id = $1;`;

const bathroomLogQuery = `
      SELECT "bathroom".bathroom_date as "date",
        "farm_bathroom".farm_bathroom_name as "name",
        "bathroom".bathroom_area as "area",
        "bathroom".bathroom_cleaned as "cleaned",
        "bathroom".bathroom_sanitized as "sanitized",
        "bathroom".bathroom_comment as "comment",
        concat("person".
        "person_first", ' ', "person".
        "person_last") as "signature"
      FROM "bathroom"
      JOIN "person"
      on "person".
      "person_id" = "bathroom".bathroom_sig
      JOIN "farm_bathroom"
      on "farm_bathroom".farm_bathroom_id = "bathroom".farm_bathroom_id
      WHERE "bathroom".harvest_year_id = 1;
      `

const packingListQuery = `
      SELECT "farm_packing".farm_packing_name as "name",
        "farm_packing".farm_packing_status as "status"
      FROM "farm_packing"
      WHERE "farm_packing".harvest_year_id = $1;
`;

const packingLogQuery = `
      SELECT "packing".packing_date as "date",
        "farm_packing".farm_packing_name as "name",
        "packing".packing_area as "area",
        "packing".packing_cleaned as "cleaned",
        "packing".packing_sanitized as "sanitized",
        "packing".packing_comment as "comment",
        concat("person".
          "person_first", ' ', "person".
          "person_last") as "signature"
      FROM "packing"
      JOIN "farm_packing"
      on "farm_packing".farm_packing_id = "packing".farm_packing_id
      JOIN "person"
      on "person".
      "person_id" = "packing".packing_sig
      WHERE "packing".harvest_year_id = $1;
`;

const coolerListQuery = `
      SELECT "farm_cooler_name"
      as "name",
        "farm_cooler_status"
      as "active"
      FROM "farm_cooler"
      WHERE "harvest_year_id" = $1;
`;

const coolerLogQuery = `
      SELECT "cooler".cooler_date as "date",
        "farm_cooler".farm_cooler_name as "name",
        "cooler".cooler_temperature as "temperature",
        "cooler".cooler_cleaned as "cleaned",
        "cooler".cooler_sanitized as "sanitized",
        "cooler".cooler_area as "area",
        "cooler".cooler_comment as "comment",
        concat("person".
          "person_first", ' ', "person".
          "person_last") as "signature"
      FROM "cooler"
      JOIN "farm_cooler"
      on "farm_cooler".farm_cooler_id = "cooler".farm_cooler_id
      JOIN "person"
      on "person".
      "person_id" = "cooler".cooler_sig
      WHERE "cooler".harvest_year_id = $1;
`;

const otherFacilityListQuery = `
      SELECT "farm_facility_other".farm_facility_other_name as "name",
        farm_facility_other.farm_facility_other_status as "status"
      FROM "farm_facility_other"
      WHERE harvest_year_id = $1;
`;

const otherFacilityLogQuery = `
      SELECT "facility_other".facility_other_date as "date",
        "farm_facility_other".farm_facility_other_name as "name",
        "facility_other".facility_other_area as "area",
        "facility_other".facility_other_cleaned as "cleaned",
        "facility_other".facility_other_sanitized as "sanitized",
        concat("person"."person_first", ' ' , "person"."person_last") as "signature"
      FROM "facility_other"
      JOIN farm_facility_other on farm_facility_other.farm_facility_other_id = facility_other.farm_facility_other_id
      JOIN "person" on "person"."person_id" = "facility_other".facility_other_sig
      WHERE "facility_other".harvest_year_id = $1;`;

// farm information for pdf header
const farmQuery = `SELECT * FROM "farm_registry" WHERE "farm_id" = $1;`

module.exports = {
  farmQuery,
  harvestQuery,
  compostTreatmentQuery,
  farmCompostQuery,
  labelCodeQuery,
  farmManureQuery,
  farmWaterSourceQuery,
  farmWaterQuery,
  trainingQuery,
  waterInspectionQuery,
  waterTreatmentQuery,
  toolLogQuery,
  toolListQuery,
  vehicleListQuery,
  vehicleLogQuery,
  thermometerListQuery,
  thermometerLogQuery,
  firstaidListQuery,
  firstaidLogQuery,
  pestListQuery,
  pestLogQuery,
  otherEquipmentListQuery,
  otherEquipmentLogQuery,

  bathroomListQuery,
  bathroomLogQuery,
  packingListQuery,
  packingLogQuery,
  coolerListQuery,
  coolerLogQuery,
  otherFacilityListQuery,
  otherFacilityLogQuery
}