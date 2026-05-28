// File này định nghĩa các đường dẫn (Routes) API liên quan đến các trung tâm thi sát hạch lái xe.
// Nó điều hướng các request từ client đến đúng hàm xử lý trong DrivingTestCentersController.

const express = require('express');
const router = express.Router();
const drivingTestCentersController = require('../controllers/DrivingTestCentersController');

// Đường dẫn: GET /api/driving-test-centers/
// Lấy toàn bộ thông tin danh sách các trung tâm sát hạch lái xe
router.get('/', drivingTestCentersController.getAll.bind(drivingTestCentersController));

module.exports = router; // Xuất router này ra để server.js import vào
