// File này định nghĩa các đường dẫn (Routes) liên quan đến chuỗi ngày học liên tục (streak) của người dùng.
// Ánh xạ các request về streak đến các hàm tương ứng trong UserStreaksController.

const express = require('express');
const router = express.Router();
const userStreaksController = require('../controllers/UserStreaksController');

// Đường dẫn: GET /api/streaks/:user_id
// Dùng để lấy thông tin chi tiết về chuỗi ngày học liên tiếp hiện tại của một người dùng
router.get('/:user_id', userStreaksController.get.bind(userStreaksController));

// Đường dẫn: POST /api/streaks/:user_id/tick
// Dùng để đánh dấu (tick) điểm danh học tập ngày hôm nay cho người dùng, giúp tăng hoặc duy trì streak học tập liên tục
router.post('/:user_id/tick', userStreaksController.update.bind(userStreaksController));

module.exports = router; // Xuất router này ra ngoài để file server.js import vào sử dụng
