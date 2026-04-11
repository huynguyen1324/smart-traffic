const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// ===== SPECIFIC ROUTES (PHẢI ĐẶT TRƯỚC) =====

// lấy danh sách bộ đề
router.get("/:license/tests", quizController.getTestList);

// lấy câu hỏi theo bộ đề
router.get("/:license/test/:test_id", quizController.getQuestionsByTest);

// ===== SYNC WITH ANDROID QuizApiService =====

// lọc theo type + category (Thêm /questions để khớp Android)
router.get("/:license/questions/type/:type/category/:category_id", quizController.getQuestionsByTypeAndCategory);

// lọc theo type
router.get("/:license/questions/type/:type", quizController.getQuestionsByType);

// lấy tất cả câu hỏi
router.get("/:license/questions", quizController.getAllQuestions);

// lấy 1 câu hỏi theo id
router.get("/:license/questions/:id", quizController.getQuestionById);

// submit bài (Khớp với api/quizzes/results)
router.post("/results", quizController.submitQuizResult);

// lưu chi tiết từng câu hỏi
router.post("/details", quizController.saveQuizDetail);

// lấy thống kê tiến độ
router.get("/stats/:user_id", quizController.getQuizStats);

// lấy chi tiết tất cả câu đã làm (cho list grid)
router.get("/details/:user_id", quizController.getQuizDetails);

module.exports = router;