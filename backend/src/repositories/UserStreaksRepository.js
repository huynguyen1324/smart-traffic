// File này dùng để quản lý "chuỗi ngày học liên tục" (streak) của người dùng
// Giống như Duolingo ấy, giúp người dùng có thêm động lực học tập mỗi ngày để không bị mất streak!

const pool = require('../config/db');

// Lớp UserStreaksRepository giúp thực thi các truy vấn liên quan đến streak của user
class UserStreaksRepository {
    // Hàm này giúp lấy thông tin streak hiện tại của một người dùng dựa theo ID
    async findByUserId(userId) {
        // Tìm dòng streak của user trong bảng user_streaks
        const [rows] = await pool.query('SELECT * FROM user_streaks WHERE user_id = ?', [userId]);
        // Nếu tìm thấy thì trả về thông tin streak đầu tiên, không thì trả về null
        return rows[0] || null;
    }

    // Hàm này dùng để cập nhật chuỗi ngày học liên tục (streak) khi người dùng hoàn thành một bài học hay bài kiểm tra
    async updateStreak(userId) {
        const now = new Date();
        const today = now.toLocaleDateString('en-CA'); // Định dạng ngày hôm nay thành chuỗi kiểu YYYY-MM-DD
        
        // Bước 1: Tìm xem người dùng này đã từng có streak trong database chưa
        const [rows] = await pool.query('SELECT * FROM user_streaks WHERE user_id = ?', [userId]);
        
        // Bước 2: Nếu đây là lần đầu tiên người dùng làm bài (chưa có dòng dữ liệu nào)
        if (rows.length === 0) {
            // Thêm mới một dòng streak vào database với chuỗi học là 1 ngày đầu tiên
            await pool.query(
                'INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date) VALUES (?, 1, 1, ?)',
                [userId, today]
            );
            // Trả về kết quả chuỗi hiện tại là 1 và chuỗi kỷ lục là 1
            return { current_streak: 1, longest_streak: 1 };
        }

        // Bước 3: Nếu đã có thông tin streak từ trước
        const streak = rows[0];
        const lastDate = new Date(streak.last_activity_date).toLocaleDateString('en-CA');
        
        // Trường hợp A: Nếu hôm nay người dùng đã làm bài rồi (lastDate trùng khớp với today)
        if (lastDate === today) {
            // Giữ nguyên thông tin streak hiện tại, không cộng dồn thêm để tránh việc user làm nhiều bài trong 1 ngày bị tăng streak vô lý
            return streak; 
        }

        // Bước 4: Tính toán ngày hôm qua (yesterday) để xem user có học liên tiếp không
        const yesterdayObj = new Date(now);
        yesterdayObj.setDate(yesterdayObj.getDate() - 1);
        const yesterday = yesterdayObj.toLocaleDateString('en-CA');

        let newStreak = 1; // Mặc định nếu bị đứt chuỗi thì reset streak hiện tại về 1 ngày
        
        // Trường hợp B: Nếu lần làm bài gần nhất là ngày hôm qua (lastDate trùng với yesterday)
        if (lastDate === yesterday) {
            // Tuyệt vời! Người dùng học rất chăm chỉ, tăng chuỗi học liên tục hiện tại lên 1 ngày
            newStreak = streak.current_streak + 1;
        }

        // Bước 5: Cập nhật lại kỷ lục streak dài nhất (longest_streak) bằng cách so sánh kỷ lục cũ với chuỗi mới
        const newLongest = Math.max(streak.longest_streak, newStreak);

        // Bước 6: Cập nhật các thông tin streak mới tính toán được vào database
        await pool.query(
            'UPDATE user_streaks SET current_streak = ?, longest_streak = ?, last_activity_date = ? WHERE user_id = ?',
            [newStreak, newLongest, today, userId]
        );

        // Trả về kết quả streak hiện tại và streak kỷ lục mới nhất cho người dùng xem
        return { current_streak: newStreak, longest_streak: newLongest };
    }
}

module.exports = new UserStreaksRepository();
