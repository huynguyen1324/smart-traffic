/**
 * @file LawCategoriesService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến LawCategories.
 * @module Backend
 */

const lawCategoriesRepository = require('../repositories/LawCategoriesRepository');

/**
 * Lớp LawCategoriesService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến LawCategories.
 */
class LawCategoriesService {
        /**
     * Lấy danh sách tất cả các bản ghi
     * @returns {Promise<Array>} Danh sách thực thể dữ liệu
     */
    async getAll() {
        return await lawCategoriesRepository.findAll();
    }

        /**
     * Tìm bản ghi theo mã định danh (ID)
     * @param {number|string} id - Mã định danh
     * @returns {Promise<Object|null>} Thực thể dữ liệu hoặc null
     */
    async getById(id) {
        return await lawCategoriesRepository.findById(id);
    }

        /**
     * Tạo mới một thực thể dữ liệu
     * @param {Object} data - Dữ liệu thực thể
     * @returns {Promise<number>} ID của bản ghi vừa được tạo
     */
    async create(data) {
        return await lawCategoriesRepository.save(data);
    }

        /**
     * Cập nhật thông tin thực thể dữ liệu theo ID
     * @param {number|string} id - Mã định danh
     * @param {Object} data - Dữ liệu cần cập nhật
     * @returns {Promise<boolean>} Trạng thái thành công
     */
        /**
     * Cập nhật dữ liệu dòng trong CSDL dựa theo ID
     * @param {number|string} id - Khóa chính
     * @param {Object} data - Cập nhật tương ứng
     * @returns {Promise<boolean>} Có dòng nào được cập nhật thành công hay không
     */
    async update(id, data) {
        return await lawCategoriesRepository.update(id, data);
    }

        /**
     * Xóa thực thể dữ liệu theo ID
     * @param {number|string} id - Mã định danh của phần tử cần xóa
     * @returns {Promise<boolean>} Trạng thái xóa thành công
     */
        /**
     * Thực hiện xóa dòng khỏi bảng CSDL dựa vào khóa chính ID
     * @param {number|string} id - Khóa chính
     * @returns {Promise<boolean>} Trạng thái xóa thành công
     */
    async delete(id) {
        return await lawCategoriesRepository.delete(id);
    }
}
module.exports = new LawCategoriesService();
