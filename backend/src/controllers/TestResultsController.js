// File này dùng để điều phối (Controller) các yêu cầu liên quan đến kết quả thi thử của người dùng.
// Giúp lưu trữ kết quả thi thử mới cũng như truy vấn lại lịch sử thi cử của từng bạn học viên.

const testResultsService = require('../services/TestResultsService');

class TestResultsController {
    // Hàm này giúp lấy toàn bộ lịch sử kết quả thi thử của một người dùng thông qua mã user_id
    // user_id được gửi trên đường dẫn URL (req.params.user_id)
    async getByUserId(req, res) {
        try {
            const data = await testResultsService.getByUserId(req.params.user_id);
            res.json(data); // Trả về danh sách các kết quả thi thử dạng JSON
        } catch (err) { 
            // Nếu có lỗi hệ thống thì báo lỗi 500 liền
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp tạo và lưu lại một kết quả thi thử mới sau khi người dùng nộp bài
    // Dữ liệu kết quả được gửi trong phần body của request (req.body)
    async create(req, res) {
        try {
            const id = await testResultsService.create(req.body);
            // Trả về mã thành công 201 (Created) kèm theo ID của bản ghi vừa tạo trong db
            res.status(201).json({ message: 'Created', id });
        } catch (err) { 
            // Báo lỗi 500 nếu gặp sự cố lưu trữ
            res.status(500).json({ error: err.message }); 
        }
    }
}
module.exports = new TestResultsController(); // Xuất instance để routes bên ngoài có thể gọi tới
