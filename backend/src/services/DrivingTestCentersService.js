/**
 * @file DrivingTestCentersService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến DrivingTestCenters.
 * @module Backend
 */

const drivingTestCentersRepository = require('../repositories/DrivingTestCentersRepository');

/**
 * Lớp DrivingTestCentersService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến DrivingTestCenters.
 */
class DrivingTestCentersService {
    async getAllCenters() {
        return await drivingTestCentersRepository.findAll();
    }
}
module.exports = new DrivingTestCentersService();
