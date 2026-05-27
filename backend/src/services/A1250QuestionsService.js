/**
 * @file A1250QuestionsService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến A1250Questions.
 * @module Backend
 */

const a1250QuestionsRepository = require('../repositories/A1250QuestionsRepository');

/**
 * Lớp A1250QuestionsService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến A1250Questions.
 */
class A1250QuestionsService {
        /**
     * Lấy danh sách tất cả các bản ghi
     * @returns {Promise<Array>} Danh sách thực thể dữ liệu
     */
    async getAll() {
        return await a1250QuestionsRepository.findAll();
    }

        /**
     * Tìm bản ghi theo mã định danh (ID)
     * @param {number|string} id - Mã định danh
     * @returns {Promise<Object|null>} Thực thể dữ liệu hoặc null
     */
    async getById(id) {
        return await a1250QuestionsRepository.findById(id);
    }

        /**
     * Tạo mới một thực thể dữ liệu
     * @param {Object} data - Dữ liệu thực thể
     * @returns {Promise<number>} ID của bản ghi vừa được tạo
     */
    async create(data) {
        return await a1250QuestionsRepository.save(data);
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
        return await a1250QuestionsRepository.update(id, data);
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
        return await a1250QuestionsRepository.delete(id);
    }
}
module.exports = new A1250QuestionsService();
