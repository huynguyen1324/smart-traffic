// File này cực kỳ quan trọng luôn nha, nó chứa các logic truy vấn dữ liệu cho phần thi trắc nghiệm (Quiz)
// Giúp xác định bảng câu hỏi tương ứng với bằng lái, lấy danh sách đề, lấy câu hỏi của từng đề và lưu lại lịch sử làm bài nữa!

const pool = require('../config/db');

// Lớp QuizRepository chứa các câu lệnh SQL phục vụ cho tính năng ôn thi trắc nghiệm
class QuizRepository {
    // Hàm phụ trợ này giúp kiểm tra xem người dùng thi bằng gì (A1 hay B2) để lấy đúng bảng dữ liệu câu hỏi nha
    getQuestionTable(license) {
        const l = (license || "").toLowerCase();
        if (l === "a1") return "a1_250_questions"; // Nếu thi bằng A1 thì chọn bảng 250 câu
        if (l === "b2") return "b2_600_questions"; // Nếu thi bằng B2 thì chọn bảng 600 câu
        // Nếu truyền lung tung thì báo lỗi liền
        throw new Error("Invalid license type: " + license);
    }

    // Hàm này giúp lấy ra danh sách các đề thi hiện có dựa theo loại bằng lái
    async findTestList(license) {
        // Xác định bảng cần lấy dữ liệu trước nè
        const table = this.getQuestionTable(license);
        // Câu lệnh SQL gom nhóm các câu hỏi theo số đề (test_number) để biết mỗi đề có bao nhiêu câu
        const [rows] = await pool.query(`
            SELECT test_number AS id, CONCAT('Đề số ', test_number) AS name, COUNT(*) AS total
            FROM ${table}
            WHERE test_number IS NOT NULL AND test_number != 0
            GROUP BY test_number
            ORDER BY test_number ASC
        `);
        return rows;
    }

    // Hàm này giúp lấy ra danh sách toàn bộ câu hỏi của một đề thi cụ thể
    async findQuestionsByTest(license, test_id) {
        // Lấy đúng bảng bằng lái ra trước
        const table = this.getQuestionTable(license);
        // Truy vấn tất cả thông tin cần thiết của câu hỏi như: nội dung, ảnh, các đáp án A/B/C/D, đáp án đúng và giải thích
        const [rows] = await pool.query(`
            SELECT id, type, type_category_id, test_number AS test_id, image_url, description_text, 
                   option_a, option_b, option_c, option_d, correct_option, explanation
            FROM ${table} WHERE test_number = ? ORDER BY id ASC
        `, [test_id]);
        return rows;
    }

    // Hàm này dùng để tìm các câu hỏi theo loại (Ví dụ: lọc riêng câu hỏi điểm liệt)
    async findQuestionsByType(license, type) {
        const table = this.getQuestionTable(license);
        // Lấy câu hỏi có loại trùng với loại đang cần tìm
        const [rows] = await pool.query(`
            SELECT * FROM ${table} WHERE type = ? ORDER BY id ASC
        `, [type]);
        return rows;
    }

    // Hàm này nâng cấp hơn tí, giúp tìm câu hỏi theo loại và theo danh mục nhỏ hơn nữa
    async findQuestionsByTypeAndCategory(license, type, categoryId) {
        const table = this.getQuestionTable(license);
        // Lọc theo cả type và type_category_id luôn nha
        const [rows] = await pool.query(`
            SELECT * FROM ${table} WHERE type = ? AND type_category_id = ? ORDER BY id ASC
        `, [type, categoryId]);
        return rows;
    }

    // Hàm này rất hay nè! Nó giúp lưu chi tiết câu trả lời của user cho từng câu hỏi cụ thể
    async saveResultDetail(data) {
        const { user_id, license, question_id, chosen_option, correct } = data;
        // Thực hiện thêm mới vào bảng chi tiết câu trả lời. 
        // Nếu user đã từng trả lời câu này trước đó rồi (bị trùng khoá chính/unique key) thì tự động cập nhật lại đáp án mới chọn luôn!
        const [result] = await pool.query(`
            INSERT INTO quiz_results_detail (user_id, license, question_id, chosen_option, correct)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE chosen_option = VALUES(chosen_option), correct = VALUES(correct)
        `, [user_id, license, question_id, chosen_option, correct]);
        return result;
    }

    // Hàm này dùng để đếm thống kê xem user đã làm được bao nhiêu câu và đúng được bao nhiêu câu rồi
    async findStats(userId, license) {
        // Dùng câu lệnh COUNT để đếm tổng số câu đã làm và SUM kết hợp CASE WHEN để đếm số câu trả lời đúng
        const [rows] = await pool.query(`
            SELECT COUNT(question_id) as total_done,
                   SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as total_correct
            FROM quiz_results_detail
            WHERE user_id = ? AND license = ?
        `, [userId, license]);
        return rows[0];
    }

    // Hàm này giúp lấy danh sách chi tiết các câu đã làm (gồm id câu hỏi và trạng thái đúng hay sai)
    async findDetails(userId, license) {
        // Lấy ra danh sách các câu đã làm kèm theo trạng thái đúng/sai (được ép kiểu sang số nguyên không dấu)
        const [rows] = await pool.query(`
            SELECT question_id, CAST(correct AS UNSIGNED) as correct
            FROM quiz_results_detail
            WHERE user_id = ? AND license = ?
        `, [userId, license]);
        return rows;
    }
}

module.exports = new QuizRepository();
