/**
 * @file SignsController.js
 * @description Controller điều phối yêu cầu HTTP API liên quan đến Signs.
 * @module Backend
 */

const signsService = require('../services/SignsService');

/**
 * Lớp SignsController
 * Controller điều phối yêu cầu HTTP API liên quan đến Signs.
 */
class SignsController {
        /**
     * Lấy toàn bộ danh sách dữ liệu
     * @param {Object} req - Đối tượng Express Request
     * @param {Object} res - Đối tượng Express Response
     * @returns {Promise<void>} Trả về JSON danh sách dữ liệu hoặc thông báo lỗi
     */
    async getAll(req, res) {
        try {
            const data = await signsService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

        /**
     * Lấy chi tiết bản ghi theo mã định danh (ID)
     * @param {Object} req - Đối tượng Express Request (yêu cầu params.id)
     * @param {Object} res - Đối tượng Express Response
     * @returns {Promise<void>} Trả về JSON bản ghi hoặc lỗi 404/500
     */
    async getById(req, res) {
        try {
            const data = await signsService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

}
module.exports = new SignsController();
