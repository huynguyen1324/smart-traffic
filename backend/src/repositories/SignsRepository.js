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
}
module.exports = new SignsRepository();
