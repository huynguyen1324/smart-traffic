// File này dùng để định nghĩa cấu trúc dữ liệu chi tiết cho từng câu hỏi trong bài thi của người dùng.
// Nó sẽ lưu lại cụ thể xem ở một câu hỏi, bạn đã chọn đáp án nào và đáp án đó đúng hay sai nha!

class TestResultDetail {
    // Hàm khởi tạo giúp tụi mình đúc ra một đối tượng lưu trữ chi tiết câu trả lời của từng câu hỏi
    constructor(id, test_result_id, question_id, chosen_option, correct) {
        this.id = id; // Mã ID duy nhất của dòng chi tiết kết quả này
        this.test_result_id = test_result_id; // Liên kết với bài thi tổng quan (để biết chi tiết này thuộc về bài làm nào của học viên)
        this.question_id = question_id; // ID của câu hỏi mà học sinh đã trả lời
        this.chosen_option = chosen_option; // Lựa chọn mà học sinh đã bấm chọn (ví dụ: 'A', 'B', 'C', 'D' hoặc để trống nếu chưa làm)
        this.correct = correct; // Trạng thái đúng sai của câu trả lời này (true nếu trả lời đúng, false nếu trả lời sai)
    }
}

// Xuất class ra ngoài để các file Controller hay Service khác lôi về xài nha
module.exports = TestResultDetail;
