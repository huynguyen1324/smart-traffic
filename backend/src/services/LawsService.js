// File này chứa các xử lý nghiệp vụ liên quan trực tiếp đến các điều luật giao thông chi tiết.
// Giúp tra cứu luật theo danh mục hoặc lấy thông tin chi tiết từng luật cụ thể.

const lawsRepository = require('../repositories/LawsRepository');

// Lớp dịch vụ quản lý thông tin các điều luật giao thông
class LawsService {
    // Hàm này giúp lấy toàn bộ danh sách các điều luật giao thông có sẵn trong hệ thống
    async getAll() {
        return await lawsRepository.findAll();
    }

    // Tra cứu chi tiết một điều luật nào đó bằng cách truyền ID của luật đó vào đây
    async getById(id) {
        return await lawsRepository.findById(id);
    }

    // Hàm cực kỳ tiện lợi: Lấy ra toàn bộ danh sách luật thuộc một danh mục cụ thể (ví dụ: xem hết các lỗi về nồng độ cồn)
    async getByCategory(categoryId) {
        return await lawsRepository.findByCategory(categoryId);
    }
}
module.exports = new LawsService();
