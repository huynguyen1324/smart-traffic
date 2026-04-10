const pool = require('../config/db');
const B2600Questions = require('../models/B2600Questions');

class B2600QuestionsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `b2_600_questions`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `b2_600_questions` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `b2_600_questions` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `b2_600_questions` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `b2_600_questions` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new B2600QuestionsRepository();
