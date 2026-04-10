const pool = require('../config/db');
const Signs = require('../models/Signs');

class SignsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `signs`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `signs` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `signs` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `signs` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `signs` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new SignsRepository();
