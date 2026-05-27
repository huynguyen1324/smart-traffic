/**
 * @file UserStreaksRepository.js
 * @description Repository thực thi các truy vấn SQL trực tiếp liên quan đến UserStreaks.
 * @module Backend
 */

const pool = require('../config/db');

/**
 * Lớp UserStreaksRepository
 * Repository thực thi các truy vấn SQL trực tiếp liên quan đến UserStreaks.
 */
class UserStreaksRepository {
    async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM user_streaks WHERE user_id = ?', [userId]);
        return rows[0] || null;
    }

        /**
     * Cập nhật chuỗi ngày học liên tục (Streak) của người dùng
     * Nếu chưa từng học, khởi tạo chuỗi học liên tiếp bằng 1.
     * Nếu học tiếp ngày hôm sau, tăng Streak hiện tại.
     * Nếu đã làm bài hôm nay rồi thì không tăng nữa.
     * @param {number} userId - Mã người dùng
     * @returns {Promise<Object>} Streak hiện tại và dài nhất
     */
    async updateStreak(userId) {
        const now = new Date();
        const today = now.toLocaleDateString('en-CA'); // Trả về dạng YYYY-MM-DD
        
        const [rows] = await pool.query('SELECT * FROM user_streaks WHERE user_id = ?', [userId]);
        
        if (rows.length === 0) {
            await pool.query(
                'INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date) VALUES (?, 1, 1, ?)',
                [userId, today]
            );
            return { current_streak: 1, longest_streak: 1 };
        }

        const streak = rows[0];
        const lastDate = new Date(streak.last_activity_date).toLocaleDateString('en-CA');
        
                // Đã tham gia học ngày hôm nay, giữ nguyên Streak để tránh cộng dồn trong 1 ngày
        if (lastDate === today) {
            return streak; // Đã học hôm nay rồi, KHÔNG tăng nữa
        }

        const yesterdayObj = new Date(now);
        yesterdayObj.setDate(yesterdayObj.getDate() - 1);
        const yesterday = yesterdayObj.toLocaleDateString('en-CA');

        let newStreak = 1;
                // Ngày học cuối cùng trùng với hôm qua, người dùng đang duy trì chuỗi học tốt
        if (lastDate === yesterday) {
            newStreak = streak.current_streak + 1;
        }

        const newLongest = Math.max(streak.longest_streak, newStreak);

        await pool.query(
            'UPDATE user_streaks SET current_streak = ?, longest_streak = ?, last_activity_date = ? WHERE user_id = ?',
            [newStreak, newLongest, today, userId]
        );

        return { current_streak: newStreak, longest_streak: newLongest };
    }
}

module.exports = new UserStreaksRepository();
