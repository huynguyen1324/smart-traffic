// File này xử lý các logic liên quan đến danh sách yêu thích (favourites) của người dùng.
// Giúp người dùng lưu lại mấy câu hỏi, luật giao thông hay biển báo mà họ quan tâm để xem lại sau.

const favouritesRepository = require('../repositories/FavouritesRepository');

// Lớp dịch vụ quản lý các mục yêu thích
class FavouritesService {
    // Hàm này lấy ra tất tần tật các bản ghi yêu thích có trong hệ thống luôn
    async getAll() {
        return await favouritesRepository.findAll();
    }

    // Tìm một bản ghi yêu thích cụ thể thông qua ID của nó
    async getById(id) {
        return await favouritesRepository.findById(id);
    }

    // Hàm cực kỳ quan trọng: Kiểm tra xem user đã "thả tim" (lưu yêu thích) cái luật/biển báo/câu hỏi này chưa nhé
    async check(userId, type, typeId) {
        return await favouritesRepository.findOne(userId, type, typeId);
    }

    // Khi người dùng bấm lưu yêu thích, hàm này sẽ được gọi để tạo một bản ghi mới
    async create(data) {
        return await favouritesRepository.save(data);
    }

    // Cập nhật lại thông tin của một bản ghi yêu thích nếu cần thiết
    async update(id, data) {
        return await favouritesRepository.update(id, data);
    }

    // Người dùng không thích nữa thì bấm bỏ lưu, hàm này sẽ xóa bản ghi yêu thích đó đi theo ID
    async delete(id) {
        return await favouritesRepository.delete(id);
    }
}
module.exports = new FavouritesService();
