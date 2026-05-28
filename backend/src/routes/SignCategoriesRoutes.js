// File này định nghĩa các đường dẫn (Routes) API liên quan đến các nhóm biển báo giao thông.
// Nó kết nối các request từ client đến đúng các hàm xử lý tương ứng trong SignCategoriesController.

const express = require('express');
const router = express.Router();
const signCategoriesController = require('../controllers/SignCategoriesController');

// Đường dẫn: GET /api/sign-categories/
// Dùng để lấy danh sách tất cả các loại/nhóm biển báo (ví dụ: Biển báo cấm, biển báo nguy hiểm...)
router.get('/', signCategoriesController.getAll.bind(signCategoriesController));

// Đường dẫn: GET /api/sign-categories/:id
// Dùng để xem thông tin chi tiết của một nhóm biển báo cụ thể dựa vào ID được truyền
router.get('/:id', signCategoriesController.getById.bind(signCategoriesController));

module.exports = router; // Xuất router này ra ngoài cho file server.js import vào
