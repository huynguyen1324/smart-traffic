/**
 * @file SignsService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến Signs.
 * @module Backend
 */

const signsRepository = require('../repositories/SignsRepository');

/**
 * Lớp SignsService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến Signs.
 */
class SignsService {
        /**
     * Lấy danh sách tất cả các bản ghi
     * @returns {Promise<Array>} Danh sách thực thể dữ liệu
     */
    async getAll() {
        return await signsRepository.findAll();
    }

        /**
     * Tìm bản ghi theo mã định danh (ID)
     * @param {number|string} id - Mã định danh
     * @returns {Promise<Object|null>} Thực thể dữ liệu hoặc null
     */
    async getById(id) {
        return await signsRepository.findById(id);
    }
}
module.exports = new SignsService();
