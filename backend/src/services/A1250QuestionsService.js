// File này làm nhiệm vụ xử lý logic cho mấy câu hỏi thi bằng lái A1, A2 (bộ 250 câu nè).
// Nó đóng vai trò trung gian, kết nối giữa Controller và Repository để lấy dữ liệu lên xử lý.

const a1250QuestionsRepository = require('../repositories/A1250QuestionsRepository');

// Lớp dịch vụ xử lý tất tần tật các câu hỏi A1, A2
class A1250QuestionsService {
    // Hàm này giúp lấy toàn bộ danh sách câu hỏi trong database ra nha
    async getAll() {
        return await a1250QuestionsRepository.findAll();
    }

    // Cần tìm câu hỏi cụ thể nào thì truyền ID vào đây, hàm sẽ lùng ra cho bạn
    async getById(id) {
        return await a1250QuestionsRepository.findById(id);
    }

    // Thêm một câu hỏi mới toanh vào cơ sở dữ liệu
    async create(data) {
        return await a1250QuestionsRepository.save(data);
    }

    // Cập nhật lại nội dung câu hỏi nào đó dựa vào ID truyền vào
    async update(id, data) {
        return await a1250QuestionsRepository.update(id, data);
    }

    // Xoá câu hỏi khỏi hệ thống bằng ID (dùng cẩn thận nha!)
    async delete(id) {
        return await a1250QuestionsRepository.delete(id);
    }
}
module.exports = new A1250QuestionsService();
