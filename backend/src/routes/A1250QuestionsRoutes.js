// File này định nghĩa các đường dẫn (Routes) API liên quan đến bộ câu hỏi thi bằng lái A1 (250 câu).
// Nó sẽ ánh xạ các request từ client đến đúng hàm xử lý trong A1250QuestionsController.

const express = require('express');
const router = express.Router();
const a1250QuestionsController = require('../controllers/A1250QuestionsController');

// Đường dẫn: GET /api/a1-250-questions/
// Dùng để lấy toàn bộ danh sách 250 câu hỏi A1
router.get('/', a1250QuestionsController.getAll.bind(a1250QuestionsController));

// Đường dẫn: GET /api/a1-250-questions/:id
// Dùng để lấy thông tin chi tiết một câu hỏi A1 dựa theo ID truyền trên đường dẫn
router.get('/:id', a1250QuestionsController.getById.bind(a1250QuestionsController));

module.exports = router; // Xuất router này ra để file server.js import vào sử dụng
