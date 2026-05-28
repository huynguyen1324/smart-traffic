// File này định nghĩa các đường dẫn (Routes) API liên quan đến danh mục luật giao thông.
// Nó giúp dẫn đường các request từ client đến đúng hàm xử lý trong LawCategoriesController.

const express = require('express');
const router = express.Router();
const lawCategoriesController = require('../controllers/LawCategoriesController');

// Đường dẫn: GET /api/law-categories/
// Dùng để lấy toàn bộ danh sách các danh mục luật có trong hệ thống
router.get('/', lawCategoriesController.getAll.bind(lawCategoriesController));

// Đường dẫn: GET /api/law-categories/:id
// Dùng để lấy thông tin chi tiết của một danh mục luật theo ID cụ thể
router.get('/:id', lawCategoriesController.getById.bind(lawCategoriesController));

module.exports = router; // Xuất router này ra để file server.js import vào
