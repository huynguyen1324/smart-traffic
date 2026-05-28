// File này dùng để quản lý chuỗi ngày học liên tục (streak) của người dùng.
// Giúp duy trì động lực học tập cho người dùng học luật giao thông mỗi ngày!

const userStreaksService = require('../services/UserStreaksService');

class UserStreaksController {
    // Hàm này giúp lấy thông tin chuỗi ngày học hiện tại của người dùng
    // Lấy user_id thông qua URL params và gọi Service để lấy data
    async get(req, res) {
        try {
            const data = await userStreaksService.getStreak(req.params.user_id);
            res.json(data); // Trả về thông tin chuỗi ngày học hiện tại dưới dạng JSON
        } catch (err) { 
            // Nếu có lỗi hệ thống thì báo lỗi 500 liền
            res.status(500).json({ error: err.message }); 
        }
    }

    // Hàm này được gọi mỗi khi người dùng hoàn thành một hoạt động học tập trong ngày (như làm bài test, xem biển báo...)
    // Nó sẽ cập nhật hoặc tăng chuỗi ngày học liên tục lên 1 ngày
    // Nhận user_id thông qua URL params
    async update(req, res) {
        try {
            const data = await userStreaksService.tickStreak(req.params.user_id);
            res.json(data); // Trả về dữ liệu chuỗi ngày học mới nhất sau khi đã được tick thêm
        } catch (err) { 
            // Báo lỗi 500 nếu gặp sự cố truy vấn hay lưu trữ database
            res.status(500).json({ error: err.message }); 
        }
    }
}

module.exports = new UserStreaksController(); // Xuất instance để routes bên ngoài import nhé
