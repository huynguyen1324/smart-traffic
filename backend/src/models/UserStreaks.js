/**
 * @file UserStreaks.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của UserStreaks.
 * @module Backend
 */

/**
 * Lớp UserStreaks
 * Model định nghĩa cấu trúc thực thể dữ liệu của UserStreaks.
 */
class UserStreaks {
    constructor(user_id, current_streak, longest_streak, last_activity_date) {
        this.user_id = user_id;
        this.current_streak = current_streak;
        this.longest_streak = longest_streak;
        this.last_activity_date = last_activity_date;
    }
}
module.exports = UserStreaks;
