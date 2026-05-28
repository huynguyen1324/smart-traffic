// File này dùng để định nghĩa cấu trúc lưu trữ lịch sử chat chit giữa bạn học sinh/người dùng với em Chatbot thông minh.
// Nhờ có file này mà hệ thống lưu lại được những đoạn hội thoại cũ để khi cần có thể hiển thị lại nha!

class ChatbotHistory {
    // Hàm khởi tạo giúp tụi mình gom các thông tin của một dòng tin nhắn chat thành một đối tượng cụ thể
    constructor(id, user_id, content) {
        this.id = id; // Mã ID duy nhất của dòng lịch sử chat này trong cơ sở dữ liệu
        this.user_id = user_id; // Mã ID của người dùng đang nhắn tin, để biết tin nhắn này thuộc về ai nè
        this.content = content; // Nội dung văn bản chat hoặc câu trả lời của AI dưới dạng chuỗi văn bản (thường định dạng JSON hoặc text)
    }
}

// Xuất cái class này ra ngoài để các phần khác của backend lôi ra xài
module.exports = ChatbotHistory;
