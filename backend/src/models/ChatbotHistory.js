/**
 * @file ChatbotHistory.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của ChatbotHistory.
 * @module Backend
 */

/**
 * Lớp ChatbotHistory
 * Model định nghĩa cấu trúc thực thể dữ liệu của ChatbotHistory.
 */
class ChatbotHistory {
    constructor(id, user_id, content) {
        this.id = id;
        this.user_id = user_id;
        this.content = content;
    }
}
module.exports = ChatbotHistory;
