/**
 * @file Users.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của Users.
 * @module Backend
 */

/**
 * Lớp Users
 * Model định nghĩa cấu trúc thực thể dữ liệu của Users.
 */
class Users {
    constructor(id, full_name, email, phone, password_hash, avatar_url, learning_goal) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.phone = phone;
        this.password_hash = password_hash;
        this.avatar_url = avatar_url;
        this.learning_goal = learning_goal;
    }
}
module.exports = Users;
