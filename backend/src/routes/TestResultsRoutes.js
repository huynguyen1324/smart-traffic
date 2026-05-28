// File này định nghĩa các đường dẫn (Routes) API liên quan đến việc lưu và lấy kết quả thi thử của người dùng.
// Giúp kết nối request của client với các hàm tương ứng trong TestResultsController.

const express = require('express');
const router = express.Router();
const testResultsController = require('../controllers/TestResultsController');

// Đường dẫn: GET /api/test-results/user/:user_id
// Dùng để lấy toàn bộ lịch sử kết quả thi thử của một người dùng thông qua user_id
router.get('/user/:user_id', testResultsController.getByUserId.bind(testResultsController));

// Đường dẫn: POST /api/test-results/
// Dùng để lưu lại một kết quả thi thử mới sau khi người dùng nộp bài thi
router.post('/', testResultsController.create.bind(testResultsController));

module.exports = router; // Xuất router này ra ngoài để file server.js import vào
