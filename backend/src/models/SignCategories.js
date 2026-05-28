// File này định nghĩa cấu trúc dữ liệu cho các nhóm/danh mục biển báo giao thông nè các bạn.
// Nhờ có cái này mà trên giao diện chúng mình có thể gom các biển báo vào các mục như Biển cấm, Biển chỉ dẫn, Biển báo nguy hiểm... cho dễ nhìn!

class SignCategories {
    // Hàm khởi tạo để tạo ra một đối tượng danh mục biển báo cụ thể
    constructor(id, name) {
        this.id = id; // Mã ID duy nhất của danh mục biển báo này trong cơ sở dữ liệu
        this.name = name; // Tên của nhóm biển báo này (ví dụ: "Biển báo cấm", "Biển báo nguy hiểm")
    }
}

// Xuất class này ra ngoài cho các file khác lôi về dùng chung nhé
module.exports = SignCategories;
