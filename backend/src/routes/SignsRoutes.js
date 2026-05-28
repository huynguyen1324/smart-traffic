// File này định nghĩa các đường dẫn (Routes) API liên quan đến thông tin các biển báo giao thông chi tiết.
// Ánh xạ các request lấy danh sách hoặc lấy chi tiết biển báo giao thông từ client đến SignsController.

const express = require('express');
const router = express.Router();
const signsController = require('../controllers/SignsController');

// Đường dẫn: GET /api/signs/
// Dùng để lấy danh sách tất cả các biển báo giao thông trong hệ thống phục vụ việc tra cứu
router.get('/', signsController.getAll.bind(signsController));

// Đường dẫn: GET /api/signs/:id
// Dùng để lấy thông tin chi tiết một biển báo giao thông thông qua ID được truyền trên URL
router.get('/:id', signsController.getById.bind(signsController));

module.exports = router; // Xuất router này ra ngoài để file server.js import vào
