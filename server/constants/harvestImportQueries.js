const field = `
    INSERT INTO "farm_field" ("field_name", "harvest_year_id", "farm_field_status") 
    SELECT "field_name", $1, "farm_field_status" 
    FROM "farm_field" 
    WHERE "farm_field".harvest_year_id = $2 AND "farm_field_status" = 'true';
  `

const crop = `
  INSERT INTO "farm_crop"("farm_crop_type", "harvest_year_id", "farm_crop_status") 
  SELECT "farm_crop_type", $1, "farm_crop_status"
  FROM "farm_crop"
  WHERE "harvest_year_id" = $2 AND "farm_crop_status" = 'true';
`

const labelCodes = `
  
`

module.exports = {
  field,
  crop,
}