// File này dùng để định nghĩa danh mục của các loại luật giao thông khác nhau nhé các bạn.
// Nhờ có danh mục này mà chúng ta có thể gom nhóm các điều luật lại với nhau cho ngăn nắp, ví dụ: Luật cho xe máy, Luật cho xe ô tô, v.v.

class LawCategories {
    // Hàm khởi tạo giúp tụi mình đúc ra một đối tượng danh mục luật cụ thể
    constructor(id, name) {
        this.id = id; // ID duy nhất của danh mục luật trong database để phân biệt giữa các nhóm luật
        this.name = name; // Tên của danh mục luật này (ví dụ: "Quy định tốc độ", "Xử phạt nồng độ cồn")
    }
}

// Xuất class ra để các file Controller hay Service khác lôi về xài nha
module.exports = LawCategories;
