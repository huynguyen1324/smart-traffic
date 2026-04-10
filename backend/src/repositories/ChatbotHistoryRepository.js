const pool = require('../config/db');
const ChatbotHistory = require('../models/ChatbotHistory');

class ChatbotHistoryRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `chatbot_history`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `chatbot_history` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `chatbot_history` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `chatbot_history` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `chatbot_history` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new ChatbotHistoryRepository();
