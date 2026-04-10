const pool = require('../config/db');
const SignCategories = require('../models/SignCategories');

class SignCategoriesRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `sign_categories`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `sign_categories` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `sign_categories` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `sign_categories` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `sign_categories` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new SignCategoriesRepository();
