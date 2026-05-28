// File này quản lý các danh mục luật giao thông (ví dụ như: Lỗi vi phạm chạy quá tốc độ, Lỗi nồng độ cồn...).
// Giúp gom nhóm các điều luật lại cho người dùng dễ tìm kiếm và tra cứu.

const lawCategoriesRepository = require('../repositories/LawCategoriesRepository');

// Lớp dịch vụ để thao tác với các danh mục luật
class LawCategoriesService {
    // Lấy ra tất cả các danh mục luật đang có trong cơ sở dữ liệu
    async getAll() {
        return await lawCategoriesRepository.findAll();
    }

    // Tìm một danh mục luật cụ thể dựa vào mã ID của nó
    async getById(id) {
        return await lawCategoriesRepository.findById(id);
    }

    // Tạo thêm một danh mục luật mới (ví dụ khi có nghị định hay quy định mới ban hành)
    async create(data) {
        return await lawCategoriesRepository.save(data);
    }

    // Cập nhật lại tên gọi hoặc mô tả của danh mục luật nào đó theo ID
    async update(id, data) {
        return await lawCategoriesRepository.update(id, data);
    }

    // Xóa bỏ một danh mục luật không còn dùng tới nữa bằng ID
    async delete(id) {
        return await lawCategoriesRepository.delete(id);
    }
}
module.exports = new LawCategoriesService();
