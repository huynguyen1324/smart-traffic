// File này dùng để điều hướng (Controller) các yêu cầu liên quan đến bộ câu hỏi thi bằng lái A1 (gồm 250 câu)
// Nó nhận request từ client, gọi Service xử lý và trả về dữ liệu kết quả.

const a1250QuestionsService = require('../services/A1250QuestionsService');

class A1250QuestionsController {
    // Hàm này giúp lấy toàn bộ danh sách 250 câu hỏi A1
    // Gọi đến service để lấy data và trả về dưới dạng JSON cho client
    async getAll(req, res) {
        try {
            const data = await a1250QuestionsService.getAll();
            res.json(data); // Trả về danh sách câu hỏi thành công nè
        } catch (err) { 
            // Nếu có lỗi xảy ra thì báo lỗi 500 liền
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp lấy thông tin chi tiết của một câu hỏi A1 cụ thể thông qua ID truyền lên
    // ID được truyền ở đường dẫn URL (req.params.id)
    async getById(req, res) {
        try {
            const data = await a1250QuestionsService.getById(req.params.id);
            // Nếu không tìm thấy câu hỏi nào có ID này thì báo lỗi 404
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Trả về thông tin câu hỏi tìm được
        } catch (err) { 
            // Lỗi hệ thống hoặc lỗi truy vấn database thì báo 500
            res.status(500).json({ error: err.message }); 
        }
    }

}
module.exports = new A1250QuestionsController(); // Xuất ra một instance để các file khác (routes) sử dụng
