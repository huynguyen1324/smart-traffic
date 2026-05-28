// File này làm nhiệm vụ điều phối (Controller) các yêu cầu liên quan đến các danh mục luật giao thông.
// Nó nhận request từ client, gọi đến Service tương ứng để truy vấn database và trả về danh sách/chi tiết các danh mục luật.

const lawCategoriesService = require('../services/LawCategoriesService');

class LawCategoriesController {
    // Hàm này giúp lấy toàn bộ danh mục luật giao thông (ví dụ: Luật đường bộ, đường sắt, xử phạt,...)
    // Gọi Service lấy dữ liệu rồi trả về định dạng JSON cực kỳ nhanh chóng cho client
    async getAll(req, res) {
        try {
            const data = await lawCategoriesService.getAll();
            res.json(data); // Trả về danh sách danh mục luật thành công
        } catch (err) { 
            // Có lỗi gì thì quăng lỗi 500 kèm chi tiết lỗi
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp tìm danh mục luật cụ thể thông qua ID được truyền lên
    // ID lấy từ thanh địa chỉ URL (req.params.id)
    async getById(req, res) {
        try {
            const data = await lawCategoriesService.getById(req.params.id);
            // Nếu không tìm thấy danh mục luật nào khớp với ID thì báo lỗi 404
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Trả về thông tin danh mục luật tìm thấy
        } catch (err) { 
            // Nếu lỗi database thì báo 500 cho client biết
            res.status(500).json({ error: err.message }); 
        }
    }

}
module.exports = new LawCategoriesController(); // Xuất instance để các file routes import vào sử dụng nhé
