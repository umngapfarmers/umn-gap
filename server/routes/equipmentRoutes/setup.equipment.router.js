const express = require('express');
const router = express.Router();
const otherEquipmentRouter = require('../equipmentRoutes/equipment.other.router');
const toolEquipmentRouter = require('../equipmentRoutes/equipment.tool.router');
const vehicleEquipmentRouter = require('../equipmentRoutes/equipment.vehicle.router');
const thermometerEquipmentRouter = require('../equipmentRoutes/equipment.thermometer.router');


router.use('/tool', toolEquipmentRouter);
router.use('/vehicle', vehicleEquipmentRouter);
router.use('/equipment_other', otherEquipmentRouter);
routher.use('/thermometer', thermometerEquipmentRouter);



module.exports = router;