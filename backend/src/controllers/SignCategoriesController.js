// File này dùng để điều hướng (Controller) các yêu cầu liên quan đến các nhóm biển báo giao thông (ví dụ: biển báo cấm, biển báo nguy hiểm, biển chỉ dẫn,...).
// Nhận request từ client, gọi Service xử lý và trả về dữ liệu.

const signCategoriesService = require('../services/SignCategoriesService');

class SignCategoriesController {
    // Hàm này giúp lấy toàn bộ danh mục các loại biển báo giao thông có trên hệ thống
    // Gọi đến service lấy dữ liệu từ db rồi trả về định dạng JSON
    async getAll(req, res) {
        try {
            const data = await signCategoriesService.getAll();
            res.json(data); // Phản hồi danh sách nhóm biển báo cho client
        } catch (err) { 
            // Báo lỗi 500 nếu gặp sự cố hệ thống
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này giúp lấy chi tiết một danh mục biển báo theo ID
    // ID được truyền trên URL (req.params.id)
    async getById(req, res) {
        try {
            const data = await signCategoriesService.getById(req.params.id);
            // Nếu không tìm thấy nhóm biển báo nào với ID này thì báo lỗi 404 ngay
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Trả về thông tin chi tiết nhóm biển báo
        } catch (err) { 
            // Xảy ra lỗi database thì báo lỗi 500
            res.status(500).json({ error: err.message }); 
        }
    }

}
module.exports = new SignCategoriesController(); // Xuất instance để routes bên ngoài import nhé
