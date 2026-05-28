// File này định nghĩa toàn bộ các đường dẫn (Routes) API liên quan đến phần thi trắc nghiệm (Quiz).
// Nó kết nối các request từ client đến các hàm xử lý logic tương ứng trong QuizController.

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/QuizController');

// Đường dẫn: GET /api/quizzes/:license/tests
// Lấy danh sách các đề thi thử có sẵn theo loại bằng lái (ví dụ: A1, B2)
router.get("/:license/tests", quizController.getTestList.bind(quizController));

// Đường dẫn: GET /api/quizzes/:license/test/:test_id
// Lấy toàn bộ danh sách câu hỏi nằm trong đề thi thử cụ thể
router.get("/:license/test/:test_id", quizController.getQuestionsByTest.bind(quizController));

// Đường dẫn: GET /api/quizzes/:license/questions/type/:type
// Lấy câu hỏi theo loại (ví dụ: câu hỏi điểm liệt, câu hỏi lý thuyết, câu hỏi sa hình...) của bằng lái tương ứng
router.get("/:license/questions/type/:type", quizController.getQuestionsByType.bind(quizController));

// Đường dẫn: GET /api/quizzes/:license/questions/type/:type/category/:category_id
// Lọc sâu hơn: Lấy câu hỏi theo cả loại bằng, loại câu hỏi lẫn ID nhóm biển báo/luật cụ thể
router.get("/:license/questions/type/:type/category/:category_id", quizController.getQuestionsByTypeAndCategory.bind(quizController));

// Đường dẫn: POST /api/quizzes/details
// Lưu lại đáp án đã chọn của người dùng cho từng câu hỏi cụ thể để chấm điểm và thống kê
router.post("/details", quizController.saveQuizDetail.bind(quizController));

// Đường dẫn: GET /api/quizzes/stats/:user_id
// Lấy dữ liệu thống kê tổng quan (số câu đúng/sai) của một người dùng cụ thể
router.get("/stats/:user_id", quizController.getQuizStats.bind(quizController));

// Đường dẫn: GET /api/quizzes/details/:user_id
// Lấy lịch sử chi tiết tất cả các câu hỏi mà người dùng này từng làm qua
router.get("/details/:user_id", quizController.getQuizDetails.bind(quizController));

module.exports = router; // Xuất router này ra ngoài cho server.js sử dụng
