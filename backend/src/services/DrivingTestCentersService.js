// File này xử lý các nghiệp vụ liên quan đến trung tâm sát hạch lái xe.
// Nó lấy thông tin địa điểm thi từ database lên để hiển thị cho người dùng.

const drivingTestCentersRepository = require('../repositories/DrivingTestCentersRepository');

// Lớp dịch vụ lấy thông tin các trung tâm sát hạch lái xe
class DrivingTestCentersService {
    // Hàm này giúp lấy toàn bộ danh sách các trung tâm thi lái xe hiện có nhé
    async getAllCenters() {
        return await drivingTestCentersRepository.findAll();
    }
}
module.exports = new DrivingTestCentersService();
