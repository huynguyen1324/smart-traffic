const pool = require('../config/db');
const A1250Questions = require('../models/A1250Questions');

class A1250QuestionsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `a1_250_questions`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `a1_250_questions` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `a1_250_questions` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `a1_250_questions` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `a1_250_questions` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new A1250QuestionsRepository();
