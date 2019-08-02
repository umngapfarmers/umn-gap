const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();
const otherEquipmentRouter = require('../equipmentRoutes/equipment.other.router');
const toolEquipmentRouter = require('../equipmentRoutes/equipment.tool.router');
const vehicleEquipmentRouter = require('../equipmentRoutes/equipment.vehicle.router');


router.use('/tool', toolEquipmentRouter);
router.use('/vehicle', vehicleEquipmentRouter);
router.use('/equipment_other', otherEquipmentRouter);



module.exports = router;