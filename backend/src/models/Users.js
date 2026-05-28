// File này định nghĩa cấu trúc dữ liệu cho Người Dùng (Users) trên hệ thống của tụi mình.
// Chứa toàn bộ thông tin cá nhân cần thiết để đăng nhập, chỉnh sửa hồ sơ và đặt mục tiêu thi cử nha!

class Users {
    // Hàm khởi tạo giúp chúng mình tạo ra một đối tượng người dùng cụ thể với các thuộc tính rõ ràng
    constructor(id, full_name, email, phone, password_hash, avatar_url, learning_goal) {
        this.id = id; // ID độc nhất của người dùng trong hệ thống (thường tự động tăng khi có người đăng ký mới)
        this.full_name = full_name; // Họ và tên của người dùng (ví dụ: "Nguyễn Văn người dùng")
        this.email = email; // Địa chỉ thư điện tử dùng để đăng nhập hệ thống và nhận các thông báo cần thiết
        this.phone = phone; // Số điện thoại liên lạc của người dùng
        this.password_hash = password_hash; // Chuỗi mật khẩu đã được mã hóa an toàn (để bảo mật tối đa, không ai xem trộm được mật khẩu gốc)
        this.avatar_url = avatar_url; // Link ảnh đại diện dễ thương của bạn đó để hiển thị trên góc màn hình
        this.learning_goal = learning_goal; // Mục tiêu học tập tự đặt ra (ví dụ: "Thi đỗ bằng A1 trong 1 nốt nhạc")
    }
}

// Xuất class này ra ngoài để mấy chỗ Controller xử lý Đăng ký/Đăng nhập lấy về dùng
module.exports = Users;
