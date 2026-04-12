const pool = require('../config/db');
const Users = require('../models/Users');

class UsersRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `users`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `users` WHERE id = ?', [id]);
        return rows[0] || null;
    }
    async findByEmailOrPhone(identifier) {
        const [rows] = await pool.query('SELECT * FROM `users` WHERE email = ? OR phone = ?', [identifier, identifier]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `users` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `users` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `users` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new UsersRepository();
