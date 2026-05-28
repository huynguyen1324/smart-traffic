// File này dùng để định nghĩa cấu trúc dữ liệu của các câu hỏi ôn thi bằng lái xe máy hạng A1/A2 (bộ đề 250 câu hỏi đó các bạn).
// Nó giúp định hình xem một câu hỏi sẽ bao gồm những thông tin chi tiết gì để tụi mình dễ quản lý và hiển thị lên giao diện nha!

class A1250Questions {
    // Hàm khởi tạo này giống như một cái khuôn đúc, giúp tạo ra một đối tượng câu hỏi hoàn chỉnh với đầy đủ các thuộc tính của nó
    constructor(id, type, type_category_id, test_number, image_url, description_text, option_a, option_b, option_c, option_d, correct_option, explanation) {
        this.id = id; // Mã ID độc nhất của câu hỏi (thường tự tăng trong database)
        this.type = type; // Loại câu hỏi (ví dụ: câu hỏi điểm liệt hay câu hỏi bình thường)
        this.type_category_id = type_category_id; // Mã phân loại câu hỏi (để biết câu này thuộc phần luật, biển báo hay sa hình)
        this.test_number = test_number; // Số thứ tự của đề thi (nếu câu hỏi này thuộc một đề thi cụ thể nào đó)
        this.image_url = image_url; // Đường dẫn hình ảnh đi kèm nếu câu hỏi có hình minh họa (như biển báo hoặc sa hình)
        this.description_text = description_text; // Nội dung câu hỏi chính mà người dùng sẽ đọc
        this.option_a = option_a; // Nội dung của đáp án A để người dùng chọn
        this.option_b = option_b; // Nội dung của đáp án B để người dùng chọn
        this.option_c = option_c; // Nội dung của đáp án C để người dùng chọn
        this.option_d = option_d; // Nội dung của đáp án D để người dùng chọn (nếu có)
        this.correct_option = correct_option; // Đáp án chính xác của câu hỏi này (ví dụ: 'A', 'B', 'C' hoặc 'D')
        this.explanation = explanation; // Lời giải thích chi tiết tại sao đáp án đó lại đúng, giúp người dùng ôn tập hiểu bài sâu hơn
    }
}

// Xuất class này ra ngoài để mấy chỗ khác như Controller hay Service lấy ra xài nha
module.exports = A1250Questions;
