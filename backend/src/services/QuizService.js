// File này giải quyết tất tần tật các nghiệp vụ liên quan đến thi trắc nghiệm (Quiz).
// Bao gồm: tải đề thi, lấy câu hỏi theo bộ, lưu lịch sử làm bài và tính toán thống kê xem người dùng học hành ra sao.

const quizRepository = require('../repositories/QuizRepository');
const pool = require('../config/db');

// Lớp dịch vụ quản lý các tính năng trắc nghiệm và ôn tập
class QuizService {
    // Lấy danh sách các đề thi có sẵn dựa theo hạng bằng lái xe (A1 hay B2...)
    async getTestList(license) {
        return await quizRepository.findTestList(license);
    }

    // Tải toàn bộ câu hỏi của một đề thi cụ thể dựa vào ID đề và hạng bằng lái
    async getQuestionsByTest(license, test_id) {
        return await quizRepository.findQuestionsByTest(license, test_id);
    }

    // Lấy danh sách câu hỏi theo phân loại (ví dụ: câu hỏi điểm liệt, biển báo...) của hạng bằng lái đó
    async getQuestionsByType(license, type) {
        return await quizRepository.findQuestionsByType(license, type);
    }

    // Lấy câu hỏi vừa theo loại (điểm liệt, sa hình...) vừa theo danh mục cụ thể hơn
    async getQuestionsByTypeAndCategory(license, type, categoryId) {
        return await quizRepository.findQuestionsByTypeAndCategory(license, type, categoryId);
    }

    // Lưu lại chi tiết câu trả lời của user cho từng câu hỏi (chọn phương án nào, kết quả đúng hay sai)
    async saveQuizDetail(userId, license, questionId, chosenOption, correct) {
        return await quizRepository.saveResultDetail({
            user_id: userId,
            license,
            question_id: questionId,
            chosen_option: chosenOption,
            correct
        });
    }

    // Tính toán thống kê học tập xem user đã làm được bao nhiêu câu, đúng bao nhiêu câu và tỉ lệ phần trăm chính xác
    async getQuizStats(userId) {
        // Đầu tiên, phải truy vấn database lấy thông tin xem user này đang học bằng gì (learning_goal)
        const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [userId]);
        if (!userRows.length) throw new Error("User not found"); // Không thấy user là báo lỗi liền!
        
        // Mặc định nếu không chọn thì cho học A1 luôn cho máu nha, nhớ chuyển về chữ thường để so khớp
        const license = (userRows[0].learning_goal || 'a1').toLowerCase();
        
        // Gọi repository để tính số câu đã làm và số câu trả lời đúng
        const stats = await quizRepository.findStats(userId, license);

        const totalDone = stats.total_done || 0;
        const totalCorrect = stats.total_correct || 0;
        
        // Tính tỷ lệ phần trăm trả lời đúng (nếu chưa làm câu nào thì mặc định 0%)
        const accuracyRate = totalDone > 0 ? (totalCorrect / totalDone) * 100 : 0;
        
        // Xác định tổng số câu hỏi theo hạng bằng: A1 có 250 câu, còn lại (như B1, B2) có 600 câu nha
        const totalQuestionsCount = license === 'a1' ? 250 : 600;

        // Trả về một object thống kê siêu đẹp để vẽ biểu đồ phía frontend nè
        return {
            total_done: totalDone,
            total_correct: totalCorrect,
            accuracy_rate: Math.round(accuracyRate * 10) / 10, // Làm tròn đến 1 chữ số thập phân cho gọn
            total_questions: totalQuestionsCount
        };
    }

    // Lấy thông tin lịch sử làm bài chi tiết của user (câu nào đúng, câu nào sai cụ thể)
    async getQuizDetails(userId) {
        // Vẫn phải lấy mục tiêu học tập (bằng lái) của user trước
        const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [userId]);
        if (!userRows.length) throw new Error("User not found");
        
        const license = (userRows[0].learning_goal || 'a1').toLowerCase();
        // Lấy chi tiết lịch sử làm bài từ database lên
        return await quizRepository.findDetails(userId, license);
    }
}

module.exports = new QuizService();
