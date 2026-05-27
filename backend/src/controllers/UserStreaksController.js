/**
 * @file UserStreaksController.js
 * @description Controller điều phối yêu cầu HTTP API liên quan đến UserStreaks.
 * @module Backend
 */

const userStreaksService = require('../services/UserStreaksService');

/**
 * Lớp UserStreaksController
 * Controller điều phối yêu cầu HTTP API liên quan đến UserStreaks.
 */
class UserStreaksController {
    async get(req, res) {
        try {
            const data = await userStreaksService.getStreak(req.params.user_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    /**
 * Cập nhật thông tin bản ghi theo mã định danh (ID)
 * @param {Object} req - Đối tượng Express Request (chứa params.id và body mới)
 * @param {Object} res - Đối tượng Express Response
 * @returns {Promise<void>} Trả về trạng thái cập nhật
 */
    async update(req, res) {
        try {
            const data = await userStreaksService.tickStreak(req.params.user_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}

module.exports = new UserStreaksController();
