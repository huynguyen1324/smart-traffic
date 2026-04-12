const express = require('express');
const router = express.Router();
const quizController = require('../controllers/QuizController');

// Danh sách bộ đề
router.get("/:license/tests", quizController.getTestList.bind(quizController));

// Câu hỏi theo bộ đề
router.get("/:license/test/:test_id", quizController.getQuestionsByTest.bind(quizController));

// Câu hỏi theo loại (Ví dụ: Scenario)
router.get("/:license/questions/type/:type", quizController.getQuestionsByType.bind(quizController));

// Câu hỏi theo loại và chuyên mục
router.get("/:license/questions/type/:type/category/:category_id", quizController.getQuestionsByTypeAndCategory.bind(quizController));

// Lưu tiến độ câu hỏi
router.post("/details", quizController.saveQuizDetail.bind(quizController));

// Thống kê tiến độ
router.get("/stats/:user_id", quizController.getQuizStats.bind(quizController));

// Chi tiết các câu đã làm
router.get("/details/:user_id", quizController.getQuizDetails.bind(quizController));

module.exports = router;
