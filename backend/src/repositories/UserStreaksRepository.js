const pool = require('../config/db');

class UserStreaksRepository {
    async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM user_streaks WHERE user_id = ?', [userId]);
        return rows[0] || null;
    }

    async updateStreak(userId) {
        // Lấy ngày hiện tại theo múi giờ địa phương (YYYY-MM-DD)
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
        // Chuyển đổi ngày từ DB sang YYYY-MM-DD để so sánh chính xác
        const lastDate = new Date(streak.last_activity_date).toLocaleDateString('en-CA');
        
        if (lastDate === today) {
            return streak; // Đã học hôm nay rồi, KHÔNG tăng nữa
        }

        const yesterdayObj = new Date(now);
        yesterdayObj.setDate(yesterdayObj.getDate() - 1);
        const yesterday = yesterdayObj.toLocaleDateString('en-CA');

        let newStreak = 1;
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
