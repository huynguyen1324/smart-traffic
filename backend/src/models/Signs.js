// File này định nghĩa cấu trúc dữ liệu chi tiết cho từng Biển Báo Giao Thông cụ thể nè.
// Giúp hệ thống quản lý đầy đủ thông tin: hình ảnh biển báo, tên gọi, mã hiệu biển báo (như P.102) cùng ý nghĩa chi tiết của nó!

class Signs {
    // Hàm khởi tạo giúp tụi mình đúc ra một đối tượng biển báo giao thông đầy đủ các trường dữ liệu
    constructor(id, category_id, image_url, title, sign_code, description) {
        this.id = id; // Mã ID độc nhất của biển báo này trong cơ sở dữ liệu
        this.category_id = category_id; // Khóa ngoại liên kết với danh mục biển báo (để biết biển báo này là biển cấm, biển hiệu lệnh hay biển nguy hiểm)
        this.image_url = image_url; // Link chứa hình ảnh thực tế của biển báo để hiển thị lên màn hình cho người dùng dễ nhận biết
        this.title = title; // Tên gọi của biển báo (ví dụ: "Cấm đi ngược chiều")
        this.sign_code = sign_code; // Kí hiệu quy chuẩn của biển báo (ví dụ: P.102)
        this.description = description; // Đoạn giải thích chi tiết ý nghĩa của biển báo này và hành vi mà người lái xe cần tuân thủ
    }
}

// Xuất class này ra ngoài để mấy chỗ khác như Controller hay Router lấy về xài
module.exports = Signs;
