// File này định nghĩa đường dẫn (Routes) cho chatbot tư vấn giao thông thông minh.
// Nó cho phép nhận request POST, hỗ trợ tải lên file ảnh từ người dùng để AI nhận diện và trả lời.

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/ChatbotController');
const multer = require('multer');

// Cấu hình multer để lưu trữ file tải lên tạm thời trong bộ nhớ RAM (memoryStorage) trước khi chuyển tiếp cho AI xử lý
const upload = multer({ storage: multer.memoryStorage() });

// Định tuyến: POST /api/chatbot/ask
// Nhận tin nhắn chat, lịch sử chat và 1 tấm ảnh tuỳ chọn (trường 'image' gửi từ form-data của client)
router.post('/ask', upload.single('image'), chatbotController.ask);

module.exports = router; // Xuất router ra cho file server.js sử dụng
