// File này làm nhiệm vụ xử lý nghiệp vụ cho từng biển báo giao thông cụ thể.
// Nó lấy thông tin chi tiết của biển báo (tên, hình ảnh, ý nghĩa) để hiển thị cho người dùng học tập và tra cứu.

const signsRepository = require('../repositories/SignsRepository');

// Lớp dịch vụ quản lý thông tin chi tiết các biển báo giao thông
class SignsService {
    // Hàm lấy ra danh sách tất cả các biển báo giao thông có trong database
    async getAll() {
        return await signsRepository.findAll();
    }

    // Tra cứu chi tiết một biển báo giao thông bất kỳ dựa vào mã ID của nó
    async getById(id) {
        return await signsRepository.findById(id);
    }
}
module.exports = new SignsService();
