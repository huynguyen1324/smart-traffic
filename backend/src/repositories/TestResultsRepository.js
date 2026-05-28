// File này dùng để lưu trữ và truy xuất kết quả thi thử của người dùng
// Chúng ta sẽ dùng các câu lệnh SELECT và INSERT đơn giản để lưu trữ thành tích của các bạn ấy nhé!

const pool = require('../config/db');
const TestResults = require('../models/TestResults');

// Lớp TestResultsRepository quản lý bảng test_results lưu kết quả thi thử
class TestResultsRepository {
    // Hàm này giúp lấy ra danh sách các bài thi thử mà một user cụ thể đã làm, xếp theo thứ tự bài mới làm đưa lên trước
    async findByUserId(userId) {
        // SELECT tất cả kết quả từ bảng test_results dựa theo user_id và sắp xếp giảm dần theo ID
        const [rows] = await pool.query('SELECT * FROM `test_results` WHERE user_id = ? ORDER BY id DESC', [userId]);
        return rows;
    }

    // Hàm này giúp lưu lại kết quả của một bài thi thử mới mà user vừa hoàn thành
    async save(data) {
        // Thực hiện lệnh INSERT dữ liệu kết quả thi vào bảng test_results
        const [result] = await pool.query('INSERT INTO `test_results` SET ?', [data]);
        // Trả về ID của bản ghi kết quả vừa mới lưu
        return result.insertId;
    }
}
module.exports = new TestResultsRepository();
