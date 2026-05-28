// File này định nghĩa các đường dẫn (Routes) API liên quan đến các điều luật giao thông chi tiết.
// Giúp kết nối request từ client đến các hàm tương ứng trong LawsController để lấy dữ liệu.

const express = require('express');
const router = express.Router();
const lawsController = require('../controllers/LawsController');

// Đường dẫn: GET /api/laws/
// Dùng để lấy toàn bộ danh sách các điều luật giao thông
router.get('/', lawsController.getAll.bind(lawsController));

// Đường dẫn: GET /api/laws/category/:category_id
// Dùng để lấy toàn bộ các điều luật thuộc về một danh mục cụ thể (ví dụ: các điều luật thuộc nhóm Xe máy)
router.get('/category/:category_id', lawsController.getByCategory.bind(lawsController));

// Đường dẫn: GET /api/laws/:id
// Dùng để lấy thông tin chi tiết một điều luật cụ thể theo ID
router.get('/:id', lawsController.getById.bind(lawsController));

module.exports = router; // Xuất router ra ngoài để file server.js import vào
