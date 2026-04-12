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
    async findByCategory(categoryId) {
        const [rows] = await pool.query('SELECT * FROM `laws` WHERE category_id = ?', [categoryId]);
        return rows;
    }
}
module.exports = new LawsRepository();
