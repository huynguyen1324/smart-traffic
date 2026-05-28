// File này chịu trách nhiệm điều phối (Controller) các yêu cầu liên quan đến các điều luật giao thông chi tiết.
// Nhận request từ client, gọi Service xử lý và phản hồi kết quả về cho ứng dụng.

const lawsService = require('../services/LawsService');

class LawsController {
    // Hàm này giúp lấy toàn bộ danh sách các điều luật giao thông có trong hệ thống
    // Rất tiện cho việc hiển thị danh sách tổng hợp
    async getAll(req, res) {
        try {
            const data = await lawsService.getAll();
            res.json(data); // Gửi trả danh sách luật về cho client
        } catch (err) { 
            // Nếu có lỗi hệ thống phát sinh thì trả về mã 500
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp lấy thông tin chi tiết của một điều luật thông qua ID cụ thể
    // ID được gửi kèm trên đường dẫn URL (req.params.id)
    async getById(req, res) {
        try {
            const data = await lawsService.getById(req.params.id);
            // Nếu không tìm thấy luật nào ứng với ID này thì trả về mã 404
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Trả về thông tin luật tìm được
        } catch (err) { 
            // Lỗi kết nối database thì báo lỗi 500 liền
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp lấy danh sách các điều luật thuộc về một danh mục luật cụ thể (ví dụ: các luật thuộc nhóm "Xe máy")
    // ID danh mục được lấy từ req.params.category_id
    async getByCategory(req, res) {
        try {
            const data = await lawsService.getByCategory(req.params.category_id);
            res.json(data); // Trả về danh sách các luật theo danh mục
        } catch (err) { 
            res.status(500).json({ error: err.message }); 
        }
    }

    // Đây cũng là hàm lấy danh sách điều luật theo danh mục (đang bị trùng lắp trong code gốc)
    // Giữ nguyên logic code để tránh làm hỏng cấu trúc cũ, chỉ thêm comment giải thích thôi nhé!
    async getByCategory(req, res) {
        try {
            const data = await lawsService.getByCategory(req.params.category_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new LawsController(); // Xuất instance ra để các routes bên ngoài gọi tới
