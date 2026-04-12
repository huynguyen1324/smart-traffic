const pool = require('../config/db');
const Favourites = require('../models/Favourites');

class FavouritesRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `favourites`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `favourites` WHERE id = ?', [id]);
        return rows[0] || null;
    }
    async findOne(userId, type, typeId) {
        const [rows] = await pool.query('SELECT * FROM `favourites` WHERE user_id = ? AND type = ? AND type_id = ?', [userId, type, typeId]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `favourites` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `favourites` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `favourites` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new FavouritesRepository();
