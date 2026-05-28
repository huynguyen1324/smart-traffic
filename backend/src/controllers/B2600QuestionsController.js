// File này dùng để điều hướng (Controller) các yêu cầu liên quan đến bộ câu hỏi thi bằng lái B2 (gồm 600 câu)
// Nó nhận các request gửi từ phía client, gọi đến Service tương ứng để xử lý database và trả về thông tin.

const b2600QuestionsService = require('../services/B2600QuestionsService');

class B2600QuestionsController {
    // Hàm này giúp lấy toàn bộ danh sách 600 câu hỏi B2
    // Client gửi request lên, hàm này gọi service lấy toàn bộ dữ liệu và phản hồi lại dạng JSON
    async getAll(req, res) {
        try {
            const data = await b2600QuestionsService.getAll();
            res.json(data); // Trả về danh sách câu hỏi B2 cho client nè
        } catch (err) { 
            // Nếu có gì đó sai sai thì quăng lỗi 500 kèm thông báo lỗi
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp tìm kiếm và lấy thông tin chi tiết một câu hỏi B2 theo ID truyền lên
    // ID được trích xuất từ tham số đường dẫn (req.params.id)
    async getById(req, res) {
        try {
            const data = await b2600QuestionsService.getById(req.params.id);
            // Nếu tìm mỏi mắt không thấy câu hỏi nào trùng ID thì báo lỗi 404
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Tìm thấy thì trả về dữ liệu câu hỏi đó ngay
        } catch (err) { 
            // Gặp lỗi kết nối database hay lỗi hệ thống thì trả về mã 500
            res.status(500).json({ error: err.message }); 
        }
    }

}
module.exports = new B2600QuestionsController(); // Xuất ra một instance để các file routes có thể import và sử dụng dễ dàng
