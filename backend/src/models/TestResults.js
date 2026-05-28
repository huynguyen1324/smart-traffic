// File này định nghĩa cấu trúc dữ liệu tổng quan cho Kết Quả Bài Thi của người dùng.
// Nó giúp lưu lại các thông tin điểm số cơ bản như số câu đúng, số câu sai, loại bằng lái xe đang thi và ngày giờ nộp bài nhé!

class TestResults {
    // Hàm khởi tạo nhận vào một cục dữ liệu (đối tượng data) rồi bóc tách ra gán vào các thuộc tính của kết quả thi
    constructor(data) {
        this.id = data.id; // Mã ID duy nhất của lượt làm bài thi này
        this.user_id = data.user_id; // ID của bạn học viên đã làm bài thi này (để biết điểm số này của bạn nào)
        this.test_id = data.test_id; // ID của đề thi vừa làm (để biết bạn thi đề số mấy)
        this.license = data.license; // Hạng bằng lái xe đang thi thử (ví dụ: 'A1', 'B2',...)
        this.total = data.total; // Tổng số lượng câu hỏi có trong bài thi này
        this.correct = data.correct; // Số câu bạn đã trả lời đúng hoàn toàn
        this.wrong = data.wrong; // Số câu bạn lỡ làm sai mất tiêu
        this.unanswered = data.unanswered; // Số câu bạn bỏ qua, chưa kịp hoặc không muốn chọn đáp án
        this.created_at = data.created_at; // Ngày giờ cụ thể lúc bạn nộp bài và lưu kết quả
    }
}

// Xuất class này ra để các phần backend khác lôi về xài nha
module.exports = TestResults;
