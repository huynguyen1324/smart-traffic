const express = require('express');
const router = express.Router();
const drivingTestCentersController = require('../controllers/DrivingTestCentersController');

router.get('/', drivingTestCentersController.getAll.bind(drivingTestCentersController));

module.exports = router;
