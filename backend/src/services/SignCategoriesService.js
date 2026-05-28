// File này quản lý các danh mục của biển báo giao thông nhé.
// Ví dụ như: nhóm Biển báo cấm, nhóm Biển báo nguy hiểm, nhóm Biển hiệu lệnh... để người dùng dễ tra cứu.

const signCategoriesRepository = require('../repositories/SignCategoriesRepository');

// Lớp dịch vụ thao tác với các nhóm biển báo giao thông
class SignCategoriesService {
    // Hàm lấy danh sách tất cả các nhóm biển báo đang có trong hệ thống
    async getAll() {
        return await signCategoriesRepository.findAll();
    }

    // Tìm thông tin chi tiết của một nhóm biển báo dựa vào mã ID của nhóm đó
    async getById(id) {
        return await signCategoriesRepository.findById(id);
    }

    // Thêm một nhóm biển báo mới vào hệ thống (ví dụ: nhóm biển báo phụ mới...)
    async create(data) {
        return await signCategoriesRepository.save(data);
    }

    // Cập nhật lại thông tin tên gọi hay mô tả của nhóm biển báo theo ID
    async update(id, data) {
        return await signCategoriesRepository.update(id, data);
    }

    // Xoá một nhóm biển báo nào đó không cần thiết nữa bằng ID
    async delete(id) {
        return await signCategoriesRepository.delete(id);
    }
}
module.exports = new SignCategoriesService();
