/**
 * @file UsersController.js
 * @description Controller điều phối yêu cầu HTTP API liên quan đến Users.
 * @module Backend
 */

const usersService = require('../services/UsersService');

/**
 * Lớp UsersController
 * Controller điều phối yêu cầu HTTP API liên quan đến Users.
 */
class UsersController {
    async login(req, res) {
        const { identifier, password } = req.body || {};
        try {
            console.log(`Attempting login for: ${identifier}`);
            const user = await usersService.login(identifier, password);
            if (!user) {
                console.log(`Login failed for: ${identifier}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            console.log(`Login successful for: ${identifier}`);
            res.json(user);
        } catch (err) {
            console.error(`Login error for ${identifier}:`, err.stack || err.message);
            res.status(500).json({ error: err.message });
        }
    }

    /**
 * Lấy toàn bộ danh sách dữ liệu
 * @param {Object} req - Đối tượng Express Request
 * @param {Object} res - Đối tượng Express Response
 * @returns {Promise<void>} Trả về JSON danh sách dữ liệu hoặc thông báo lỗi
 */
    async getAll(req, res) {
        try {
            const data = await usersService.getAll();
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
            const data = await usersService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
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
            const id = await usersService.create(req.body);
            res.status(201).json({ message: 'Created', id });
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
            const updated = await usersService.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    /**
 * Xóa bản ghi theo mã định danh (ID)
 * @param {Object} req - Đối tượng Express Request (yêu cầu params.id)
 * @param {Object} res - Đối tượng Express Response
 * @returns {Promise<void>} Trả về trạng thái xóa thành công
 */
    async delete(req, res) {
        try {
            const deleted = await usersService.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new UsersController();
