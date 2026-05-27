/**
 * @file DrivingTestCentersController.js
 * @description Controller điều phối yêu cầu HTTP API liên quan đến DrivingTestCenters.
 * @module Backend
 */

const drivingTestCentersService = require('../services/DrivingTestCentersService');

/**
 * Lớp DrivingTestCentersController
 * Controller điều phối yêu cầu HTTP API liên quan đến DrivingTestCenters.
 */
class DrivingTestCentersController {
    /**
 * Lấy toàn bộ danh sách dữ liệu
 * @param {Object} req - Đối tượng Express Request
 * @param {Object} res - Đối tượng Express Response
 * @returns {Promise<void>} Trả về JSON danh sách dữ liệu hoặc thông báo lỗi
 */
    async getAll(req, res) {
        try {
            const data = await drivingTestCentersService.getAllCenters();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new DrivingTestCentersController();
