// File này làm nhiệm vụ điều phối (Controller) các yêu cầu liên quan đến các trung tâm sát hạch và đào tạo lái xe.
// Nó sẽ nhận yêu cầu từ client, nhờ Service lấy danh sách trung tâm thi và gửi lại kết quả.

const drivingTestCentersService = require('../services/DrivingTestCentersService');

class DrivingTestCentersController {
    // Hàm này giúp lấy toàn bộ danh sách các trung tâm thi bằng lái xe trên cả nước
    // Gọi đến service để đọc dữ liệu từ database rồi trả về danh sách dạng JSON cho frontend hiển thị
    async getAll(req, res) {
        try {
            const data = await drivingTestCentersService.getAllCenters();
            res.json(data); // Trả về danh sách trung tâm thành công rồi nè!
        } catch (err) {
            // Có lỗi gì thì quăng mã lỗi 500 kèm lời nhắn lỗi
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new DrivingTestCentersController(); // Xuất instance ra để router gọi nhé
