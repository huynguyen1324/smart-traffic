/**
 * @file TestResultsController.js
 * @description Controller điều phối yêu cầu HTTP API liên quan đến TestResults.
 * @module Backend
 */

const testResultsService = require('../services/TestResultsService');

/**
 * Lớp TestResultsController
 * Controller điều phối yêu cầu HTTP API liên quan đến TestResults.
 */
class TestResultsController {
    async getByUserId(req, res) {
        try {
            const data = await testResultsService.getByUserId(req.params.user_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    /**
 * Tạo mới một bản ghi
 * @param {Object} req - Đối tượng Express Request (chứa dữ liệu trong body)
 * @param {Object} res - Đối tượng Express Response
 * @returns {Promise<void>} Trả về JSON thông báo tạo thành công và ID mới
 */
    async create(req, res) {
        try {
            const id = await testResultsService.create(req.body);
            res.status(201).json({ message: 'Created', id });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new TestResultsController();
