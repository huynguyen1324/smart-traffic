// File này làm nhiệm vụ điều phối (Controller) các yêu cầu liên quan đến thông tin các biển báo giao thông cụ thể.
// Nhận request từ client, nhờ Service lấy dữ liệu chi tiết biển báo rồi trả về kết quả.

const signsService = require('../services/SignsService');

class SignsController {
    // Hàm này giúp lấy toàn bộ danh sách các biển báo giao thông có sẵn trong cơ sở dữ liệu
    // Client gọi API này để hiển thị danh sách tra cứu biển báo
    async getAll(req, res) {
        try {
            const data = await signsService.getAll();
            res.json(data); // Trả về danh sách biển báo dạng JSON
        } catch (err) { 
            // Nếu có lỗi hệ thống hoặc kết nối db lỗi thì trả về mã 500
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này dùng để tìm kiếm chi tiết một biển báo giao thông cụ thể theo ID
    // ID được truyền qua URL params (req.params.id)
    async getById(req, res) {
        try {
            const data = await signsService.getById(req.params.id);
            // Không tìm thấy biển báo nào tương ứng thì phản hồi lỗi 404
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Trả về chi tiết biển báo tìm được
        } catch (err) { 
            // Báo lỗi 500 nếu gặp sự cố truy vấn
            res.status(500).json({ error: err.message }); 
        }
    }

}
module.exports = new SignsController(); // Xuất instance để routes bên ngoài import nhé
