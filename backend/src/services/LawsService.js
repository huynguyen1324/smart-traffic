/**
 * @file LawsService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến Laws.
 * @module Backend
 */

const lawsRepository = require('../repositories/LawsRepository');

/**
 * Lớp LawsService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến Laws.
 */
class LawsService {
        /**
     * Lấy danh sách tất cả các bản ghi
     * @returns {Promise<Array>} Danh sách thực thể dữ liệu
     */
    async getAll() {
        return await lawsRepository.findAll();
    }

        /**
     * Tìm bản ghi theo mã định danh (ID)
     * @param {number|string} id - Mã định danh
     * @returns {Promise<Object|null>} Thực thể dữ liệu hoặc null
     */
    async getById(id) {
        return await lawsRepository.findById(id);
    }

    async getByCategory(categoryId) {
        return await lawsRepository.findByCategory(categoryId);
    }
}
module.exports = new LawsService();
