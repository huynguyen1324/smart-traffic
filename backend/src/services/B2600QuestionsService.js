// File này quản lý các logic nghiệp vụ cho bộ câu hỏi thi bằng lái B1, B2 (bộ 600 câu lý thuyết siêu dài đây nè).
// Nó kết nối Controller với Repository tương ứng của bộ 600 câu để xử lý dữ liệu.

const b2600QuestionsRepository = require('../repositories/B2600QuestionsRepository');

// Lớp dịch vụ để gọi và thao tác với dữ liệu bộ câu hỏi B1/B2
class B2600QuestionsService {
    // Hàm lấy toàn bộ danh sách 600 câu hỏi ra để ôn tập
    async getAll() {
        return await b2600QuestionsRepository.findAll();
    }

    // Hàm lấy thông tin chi tiết của một câu hỏi dựa vào ID của nó
    async getById(id) {
        return await b2600QuestionsRepository.findById(id);
    }

    // Hàm thêm mới một câu hỏi vào bộ đề 600 câu
    async create(data) {
        return await b2600QuestionsRepository.save(data);
    }

    // Cập nhật nội dung hoặc đáp án của một câu hỏi cụ thể theo ID
    async update(id, data) {
        return await b2600QuestionsRepository.update(id, data);
    }

    // Xoá một câu hỏi nào đó bằng ID ra khỏi cơ sở dữ liệu
    async delete(id) {
        return await b2600QuestionsRepository.delete(id);
    }
}
module.exports = new B2600QuestionsService();
