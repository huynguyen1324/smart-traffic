// File này dùng để định nghĩa cấu trúc dữ liệu cho bộ câu hỏi thi bằng lái xe ô tô hạng B2 (bộ đề 600 câu chuẩn chỉnh của Bộ Giao thông).
// Nó giúp server định hình xem một câu hỏi ôn tập ô tô sẽ bao gồm những trường thông tin gì để hiển thị cho chuẩn xác nha!

class B2600Questions {
    // Hàm khởi tạo giúp tạo ra đối tượng câu hỏi B2 đầy đủ các thông tin cần thiết
    constructor(id, type, type_category_id, test_number, image_url, description_text, option_a, option_b, option_c, option_d, correct_option, explanation) {
        this.id = id; // Mã ID duy nhất của câu hỏi này trong cơ sở dữ liệu
        this.type = type; // Loại câu hỏi (ví dụ: câu hỏi điểm liệt, câu hỏi lý thuyết thường,...)
        this.type_category_id = type_category_id; // Mã phân loại câu hỏi (để nhóm câu hỏi vào phần luật, sa hình hay biển báo)
        this.test_number = test_number; // Số đề thi mà câu hỏi này thuộc về (nếu có đề thi cố định)
        this.image_url = image_url; // Đường link ảnh nếu câu hỏi này có sơ đồ sa hình hoặc hình vẽ biển báo đi kèm
        this.description_text = description_text; // Câu hỏi chính, đề bài mà người dùng cần phải trả lời
        this.option_a = option_a; // Nội dung lựa chọn A
        this.option_b = option_b; // Nội dung lựa chọn B
        this.option_c = option_c; // Nội dung lựa chọn C
        this.option_d = option_d; // Nội dung lựa chọn D (nếu có)
        this.correct_option = correct_option; // Đáp án đúng nhất của câu hỏi (thường lưu chữ cái viết hoa 'A', 'B', 'C', 'D')
        this.explanation = explanation; // Phần giải thích siêu có tâm giúp hiểu rõ tại sao đáp án đó lại đúng, học nhanh nhớ lâu
    }
}

// Xuất class này ra ngoài để các nơi khác trong dự án có thể gọi và sử dụng nha
module.exports = B2600Questions;
