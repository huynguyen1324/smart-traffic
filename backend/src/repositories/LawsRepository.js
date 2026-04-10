const pool = require('../config/db');
const Laws = require('../models/Laws');

class LawsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `laws`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `laws` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `laws` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `laws` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `laws` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new LawsRepository();
