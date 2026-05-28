// File này quản lý toàn bộ các tính năng liên quan đến việc làm bài thi trắc nghiệm (Quiz) của người dùng.
// Nó giúp lấy danh sách đề thi, lấy bộ câu hỏi theo đề, theo loại bằng lái, lưu kết quả làm bài của từng câu hỏi
// cũng như lấy thống kê học tập siêu chi tiết.

const quizService = require('../services/QuizService');

class QuizController {
    // Lấy danh sách các đề thi thử dựa theo loại bằng lái (A1 hoặc B2 chẳng hạn)
    // Client truyền license qua URL params
    async getTestList(req, res) {
        try {
            const { license } = req.params;
            const data = await quizService.getTestList(license);
            res.json(data); // Trả về danh sách đề thi có sẵn
        } catch (error) {
            // Có lỗi gì phát sinh thì báo lỗi 500 kèm nội dung lỗi
            res.status(500).json({ message: error.message });
        }
    }

    // Lấy danh sách toàn bộ các câu hỏi thuộc về một đề thi thử cụ thể
    // Cần truyền cả loại bằng lái (license) và mã đề thi (test_id)
    async getQuestionsByTest(req, res) {
        try {
            const { license, test_id } = req.params;
            const data = await quizService.getQuestionsByTest(license, test_id);
            res.json(data); // Trả về danh sách câu hỏi trong đề
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Lấy câu hỏi theo loại câu hỏi (ví dụ: câu hỏi điểm liệt, câu hỏi lý thuyết, sa hình...)
    // Client gửi license và loại (type) qua URL
    async getQuestionsByType(req, res) {
        try {
            const { license, type } = req.params;
            const data = await quizService.getQuestionsByType(license, type);
            res.json(data); // Trả về danh sách câu hỏi tương ứng
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Lấy câu hỏi theo cả loại câu hỏi lẫn danh mục chuyên sâu (ví dụ: luật giao thông, biển báo, nghiệp vụ...)
    // Client gửi license, type và category_id qua URL
    async getQuestionsByTypeAndCategory(req, res) {
        try {
            const { license, type, category_id } = req.params;
            const data = await quizService.getQuestionsByTypeAndCategory(license, type, category_id);
            res.json(data); // Trả về danh sách câu hỏi được lọc kỹ càng
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Lưu lại chi tiết kết quả khi người dùng chọn đáp án cho từng câu hỏi
    // Client gửi thông tin lên qua body: user_id, license, question_id, chosen_option (đáp án chọn), correct (đúng hay sai)
    async saveQuizDetail(req, res) {
        try {
            const { user_id, license, question_id, chosen_option, correct } = req.body;
            const result = await quizService.saveQuizDetail(user_id, license, question_id, chosen_option, correct);
            res.json({ message: "Detail saved", result }); // Báo lưu thành công và trả về bản ghi vừa tạo
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Lấy thống kê làm bài trắc nghiệm của một người dùng cụ thể
    // Giúp người dùng biết mình làm đúng bao nhiêu câu, sai bao nhiêu câu để ôn tập tốt hơn
    async getQuizStats(req, res) {
        try {
            const { user_id } = req.params;
            const data = await quizService.getQuizStats(user_id);
            res.json(data); // Trả về dữ liệu thống kê dạng biểu đồ hoặc số liệu
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Lấy lịch sử làm bài trắc nghiệm chi tiết của một người dùng
    // Để người dùng xem lại xem câu nào làm đúng, câu nào làm sai và sửa đổi
    async getQuizDetails(req, res) {
        try {
            const { user_id } = req.params;
            const data = await quizService.getQuizDetails(user_id);
            res.json(data); // Trả về danh sách lịch sử làm bài chi tiết
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new QuizController(); // Xuất instance để routes bên ngoài import nhé
