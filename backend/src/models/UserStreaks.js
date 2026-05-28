// File này định nghĩa cấu trúc dữ liệu cho Chuỗi Ngày Chăm Chỉ (Streak) của người dùng.
// Nó giúp theo dõi xem bạn đã đăng nhập và học tập liên tục bao nhiêu ngày để tạo động lực leo top chăm học đó nha!

class UserStreaks {
    // Hàm khởi tạo giúp tụi mình gom các thông số streak thành một đối tượng hoàn chỉnh
    constructor(user_id, current_streak, longest_streak, last_activity_date) {
        this.user_id = user_id; // Mã ID của người dùng (để biết chuỗi streak này thuộc về tài khoản nào)
        this.current_streak = current_streak; // Số ngày học liên tục hiện tại của bạn (ví dụ ngày nào cũng vào học thì tăng vù vù lên)
        this.longest_streak = longest_streak; // Chuỗi ngày học liên tục dài nhất (kỷ lục cá nhân vô tiền khoáng hậu của bạn đó)
        this.last_activity_date = last_activity_date; // Ngày gần nhất bạn làm bài thi hoặc ôn tập (dùng để check xem hôm nay bạn có học không, nếu bỏ học 1 ngày là đứt streak về 0 đó nha!)
    }
}

// Xuất class này ra ngoài để các Controller tính toán streak lôi ra dùng
module.exports = UserStreaks;
