/**
 * @file QuizService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến Quiz.
 * @module Backend
 */

const quizRepository = require('../repositories/QuizRepository');
const pool = require('../config/db');

/**
 * Lớp QuizService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến Quiz.
 */
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

        /**
     * Tính toán thống kê học tập (số câu đã làm, tỉ lệ chính xác, số câu đúng) của người dùng
     * @param {number} userId - Mã người dùng
     * @returns {Promise<Object>} Trả về tổng quan thống kê học tập
     */
    async getQuizStats(userId) {
        const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [userId]);
        if (!userRows.length) throw new Error("User not found");
        
        const license = (userRows[0].learning_goal || 'a1').toLowerCase();
                // Lấy thống kê số câu đã làm và số câu trả lời đúng từ repository
        const stats = await quizRepository.findStats(userId, license);

        const totalDone = stats.total_done || 0;
        const totalCorrect = stats.total_correct || 0;
                // Tính tỷ lệ chính xác (đơn vị phần trăm %)
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
