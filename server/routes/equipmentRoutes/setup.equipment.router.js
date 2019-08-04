const express = require('express');
const router = express.Router();
const otherEquipmentRouter = require('../equipmentRoutes/equipment.other.router');
const toolEquipmentRouter = require('../equipmentRoutes/equipment.tool.router');
const vehicleEquipmentRouter = require('../equipmentRoutes/equipment.vehicle.router');
const thermometerEquipmentRouter = require('../equipmentRoutes/equipment.thermometer.router');
const firstaidEquipmentRouter = require('../equipmentRoutes/equipment.firstaid.router');
const pestEquipmentRouter = require('../equipmentRoutes/equipment.pest.router');


router.use('/tool', toolEquipmentRouter);
router.use('/vehicle', vehicleEquipmentRouter);
router.use('/equipment_other', otherEquipmentRouter);
router.use('/thermometer', thermometerEquipmentRouter);
router.use('/firstaid', firstaidEquipmentRouter);
router.use('/pest', pestEquipmentRouter);



module.exports = router;