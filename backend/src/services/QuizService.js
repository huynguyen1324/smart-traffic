const quizRepository = require('../repositories/QuizRepository');
const pool = require('../config/db');

class QuizService {
    async getTestList(license) {
        return await quizRepository.findTestList(license);
    }

    async getQuestionsByTest(license, test_id) {
        return await quizRepository.findQuestionsByTest(license, test_id);
    }

    async getQuestionsByType(license, type) {
        return await quizRepository.findQuestionsByType(license, type);
    }

    async getQuestionsByTypeAndCategory(license, type, categoryId) {
        return await quizRepository.findQuestionsByTypeAndCategory(license, type, categoryId);
    }

    async saveQuizDetail(userId, license, questionId, chosenOption, correct) {
        return await quizRepository.saveResultDetail({
            user_id: userId,
            license,
            question_id: questionId,
            chosen_option: chosenOption,
            correct
        });
    }

    async getQuizStats(userId) {
        const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [userId]);
        if (!userRows.length) throw new Error("User not found");
        
        const license = (userRows[0].learning_goal || 'a1').toLowerCase();
        const stats = await quizRepository.findStats(userId, license);

        const totalDone = stats.total_done || 0;
        const totalCorrect = stats.total_correct || 0;
        const accuracyRate = totalDone > 0 ? (totalCorrect / totalDone) * 100 : 0;
        const totalQuestionsCount = license === 'a1' ? 250 : 600;

        return {
            total_done: totalDone,
            total_correct: totalCorrect,
            accuracy_rate: Math.round(accuracyRate * 10) / 10,
            total_questions: totalQuestionsCount
        };
    }

    async getQuizDetails(userId) {
        const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [userId]);
        if (!userRows.length) throw new Error("User not found");
        
        const license = (userRows[0].learning_goal || 'a1').toLowerCase();
        return await quizRepository.findDetails(userId, license);
    }
}

module.exports = new QuizService();
