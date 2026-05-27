/**
 * @file DrivingTestCentersRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho DrivingTestCenters.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const drivingTestCentersController = require('../controllers/DrivingTestCentersController');

router.get('/', drivingTestCentersController.getAll.bind(drivingTestCentersController));

module.exports = router;
