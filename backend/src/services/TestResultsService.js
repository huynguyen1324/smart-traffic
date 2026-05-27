/**
 * @file TestResultsService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến TestResults.
 * @module Backend
 */

const testResultsRepository = require('../repositories/TestResultsRepository');

/**
 * Lớp TestResultsService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến TestResults.
 */
class TestResultsService {
    async getByUserId(userId) {
        return await testResultsRepository.findByUserId(userId);
    }

        /**
     * Tạo mới một thực thể dữ liệu
     * @param {Object} data - Dữ liệu thực thể
     * @returns {Promise<number>} ID của bản ghi vừa được tạo
     */
    async create(data) {
        return await testResultsRepository.save(data);
    }
}
module.exports = new TestResultsService();
