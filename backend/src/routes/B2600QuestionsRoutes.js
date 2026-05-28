// File này định nghĩa các đường dẫn (Routes) API liên quan đến bộ câu hỏi thi bằng lái B2 (600 câu).
// Nó sẽ ánh xạ các request từ client đến đúng hàm xử lý trong B2600QuestionsController.

const express = require('express');
const router = express.Router();
const b2600QuestionsController = require('../controllers/B2600QuestionsController');

// Đường dẫn: GET /api/b2-600-questions/
// Dùng để lấy toàn bộ danh sách 600 câu hỏi B2
router.get('/', b2600QuestionsController.getAll.bind(b2600QuestionsController));

// Đường dẫn: GET /api/b2-600-questions/:id
// Dùng để lấy thông tin chi tiết một câu hỏi B2 dựa theo ID truyền trên đường dẫn
router.get('/:id', b2600QuestionsController.getById.bind(b2600QuestionsController));

module.exports = router; // Xuất router này ra để file server.js import vào sử dụng
