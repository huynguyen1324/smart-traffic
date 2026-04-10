const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// ===== SPECIFIC ROUTES (PHẢI ĐẶT TRƯỚC) =====

// lấy danh sách bộ đề
router.get("/:license/tests", quizController.getTestList);

// lấy câu hỏi theo bộ đề
router.get("/:license/test/:testNumber", quizController.getQuestionsByTest);

// ===== SYNC WITH ANDROID QuizApiService =====

// lọc theo type + category (Thêm /questions để khớp Android)
router.get("/:license/questions/type/:type/category/:categoryId", quizController.getQuestionsByTypeAndCategory);

// lọc theo type
router.get("/:license/questions/type/:type", quizController.getQuestionsByType);

// lấy tất cả câu hỏi
router.get("/:license/questions", quizController.getAllQuestions);

// lấy 1 câu hỏi theo id
router.get("/:license/questions/:id", quizController.getQuestionById);

// submit bài (Khớp với api/quizzes/results)
router.post("/results", quizController.submitQuizResult);

module.exports = router;