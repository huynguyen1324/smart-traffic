const quizService = require('../services/QuizService');

class QuizController {
    async getTestList(req, res) {
        try {
            const { license } = req.params;
            const data = await quizService.getTestList(license);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getQuestionsByTest(req, res) {
        try {
            const { license, test_id } = req.params;
            const data = await quizService.getQuestionsByTest(license, test_id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getQuestionsByType(req, res) {
        try {
            const { license, type } = req.params;
            const data = await quizService.getQuestionsByType(license, type);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getQuestionsByTypeAndCategory(req, res) {
        try {
            const { license, type, category_id } = req.params;
            const data = await quizService.getQuestionsByTypeAndCategory(license, type, category_id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async saveQuizDetail(req, res) {
        try {
            const { user_id, license, question_id, chosen_option, correct } = req.body;
            const result = await quizService.saveQuizDetail(user_id, license, question_id, chosen_option, correct);
            res.json({ message: "Detail saved", result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getQuizStats(req, res) {
        try {
            const { user_id } = req.params;
            const data = await quizService.getQuizStats(user_id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getQuizDetails(req, res) {
        try {
            const { user_id } = req.params;
            const data = await quizService.getQuizDetails(user_id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new QuizController();
