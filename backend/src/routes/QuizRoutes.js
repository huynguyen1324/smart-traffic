const express = require('express');
const router = express.Router();
const quizController = require('../controllers/QuizController');

router.get("/:license/tests", quizController.getTestList.bind(quizController));

router.get("/:license/test/:test_id", quizController.getQuestionsByTest.bind(quizController));

router.get("/:license/questions/type/:type", quizController.getQuestionsByType.bind(quizController));

router.get("/:license/questions/type/:type/category/:category_id", quizController.getQuestionsByTypeAndCategory.bind(quizController));

router.post("/details", quizController.saveQuizDetail.bind(quizController));

router.get("/stats/:user_id", quizController.getQuizStats.bind(quizController));

router.get("/details/:user_id", quizController.getQuizDetails.bind(quizController));

module.exports = router;
