// File này định nghĩa cấu trúc dữ liệu cho từng Điều Luật Giao Thông chi tiết nè các bạn.
// Nó giúp lưu thông tin rõ ràng về tiêu đề luật, mô tả chi tiết, hình ảnh minh họa, quy tắc cần theo và các cảnh báo xử phạt nữa!

class Laws {
    // Hàm khởi tạo để tạo ra một đối tượng điều luật giao thông hoàn chỉnh
    constructor(id, category_id, image_url, title, description, rules, warnings) {
        this.id = id; // Mã ID duy nhất của điều luật này trong database
        this.category_id = category_id; // Liên kết tới danh mục luật (để biết điều luật này nằm trong nhóm luật nào nhé)
        this.image_url = image_url; // Link hình ảnh minh họa cho điều luật này để người dùng nhìn trực quan hơn
        this.title = title; // Tiêu đề ngắn gọn của điều luật (ví dụ: "Quy định về nồng độ cồn khi lái xe")
        this.description = description; // Đoạn văn bản mô tả ngắn gọn, giải thích sơ lược về luật này
        this.rules = rules; // Quy định hoặc các quy tắc cụ thể bắt buộc người dân phải tuân theo
        this.warnings = warnings; // Thông tin cảnh báo hoặc các mức phạt tiền/tước bằng lái nếu bạn vi phạm luật này
    }
}

// Xuất class ra để các file Controller hay Service khác lôi về xài nha
module.exports = Laws;
