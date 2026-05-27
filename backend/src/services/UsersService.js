/**
 * @file UsersService.js
 * @description Service cung cấp các nghiệp vụ logic trung gian liên quan đến Users.
 * @module Backend
 */

const usersRepository = require('../repositories/UsersRepository');

/**
 * Lớp UsersService
 * Service cung cấp các nghiệp vụ logic trung gian liên quan đến Users.
 */
class UsersService {
    async login(identifier, password) {
        const user = await usersRepository.findByEmailOrPhone(identifier);
        if (user && user.password_hash === password) {
            return user;
        }
        return null;
    }

        /**
     * Lấy danh sách tất cả các bản ghi
     * @returns {Promise<Array>} Danh sách thực thể dữ liệu
     */
    async getAll() {
        return await usersRepository.findAll();
    }

        /**
     * Tìm bản ghi theo mã định danh (ID)
     * @param {number|string} id - Mã định danh
     * @returns {Promise<Object|null>} Thực thể dữ liệu hoặc null
     */
    async getById(id) {
        return await usersRepository.findById(id);
    }

        /**
     * Tạo mới một thực thể dữ liệu
     * @param {Object} data - Dữ liệu thực thể
     * @returns {Promise<number>} ID của bản ghi vừa được tạo
     */
    async create(data) {
        const userData = {};
        if (data.full_name !== undefined) userData.full_name = data.full_name;
        if (data.email !== undefined) userData.email = data.email;
        if (data.phone !== undefined) userData.phone = data.phone;
        if (data.password !== undefined) userData.password_hash = data.password;
        if (data.password_hash !== undefined) userData.password_hash = data.password_hash;
        if (data.avatar_url !== undefined) userData.avatar_url = data.avatar_url;
        if (data.learning_goal !== undefined) userData.learning_goal = data.learning_goal;

        if (userData.email) {
            const existing = await usersRepository.findByEmailOrPhone(userData.email);
            if (existing) {
                throw new Error('Email already registered');
            }
        }
        if (userData.phone) {
            const existing = await usersRepository.findByEmailOrPhone(userData.phone);
            if (existing) {
                throw new Error('Phone number already registered');
            }
        }

        return await usersRepository.save(userData);
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
        const userData = {};
        if (data.full_name !== undefined) userData.full_name = data.full_name;
        if (data.email !== undefined) userData.email = data.email;
        if (data.phone !== undefined) userData.phone = data.phone;
        if (data.password !== undefined) userData.password_hash = data.password;
        if (data.password_hash !== undefined) userData.password_hash = data.password_hash;
        if (data.avatar_url !== undefined) userData.avatar_url = data.avatar_url;
        if (data.learning_goal !== undefined) userData.learning_goal = data.learning_goal;

        if (userData.email) {
            const existing = await usersRepository.findByEmailOrPhone(userData.email);
            if (existing && existing.id !== Number(id)) {
                throw new Error('Email already in use');
            }
        }
        if (userData.phone) {
            const existing = await usersRepository.findByEmailOrPhone(userData.phone);
            if (existing && existing.id !== Number(id)) {
                throw new Error('Phone number already in use');
            }
        }

        return await usersRepository.update(id, userData);
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
        return await usersRepository.delete(id);
    }
}
module.exports = new UsersService();
