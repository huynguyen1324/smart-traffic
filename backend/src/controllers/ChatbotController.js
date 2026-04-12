const { GoogleGenerativeAI } = require('@google/generative-ai');
const userStreaksService = require('../services/UserStreaksService');

// 1. Khởi tạo bên ngoài để tránh khởi tạo lại mỗi khi gọi API (tối ưu hiệu năng)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

class ChatbotController {
    async ask(req, res) {
        try {
            if (!genAI) {
                return res.status(500).json({ error: 'GEMINI_API_KEY chưa được cấu hình.' });
            }

            const { message, userId, history } = req.body;

            // 2. Lấy nhanh thông tin tiến độ (nếu có userId)
            let userStats = "";
            if (userId) {
                try {
                    const streak = await userStreaksService.getStreak(userId);
                    userStats = `(Người dùng đã học ${streak.current_streak} ngày liên tiếp)`;
                } catch (e) { }
            }

            // 3. System Prompt: Tối giản & Phân loại Ý định
            const systemInstructions = `Bạn là trợ lý điều hướng App Giao Thông. 
            Trả về JSON: {"reply": "...", "command": "...", "params": {}}
            
            QUY TẮC ĐIỀU HƯỚNG (Nghiêm ngặt):
            1. CHỈ dùng command khi User muốn HÀNH ĐỘNG: "vào", "mở", "thi", "làm", "xem", "học".
            2. Nếu User đang hỏi KIẾN THỨC, NHẬN XÉT (ví dụ: "đề có 25 câu", "biển có 3 loại") -> Tuyệt đối để command: null.
            QUY TẮC PHẢN HỒI (Bắt buộc):
            1. Luôn ưu tiên trả lời nội dung người dùng hỏi trước.
            2. Kiểm tra xem User có đồng ý (có, ok, được, ừ...) với gợi ý trước đó không.
            3. Ánh xạ lệnh theo BẢNG sau:
               - Biển báo, Sign -> "OPEN_SIGNS"
               - Tiến độ, Thành tích, Streak -> "OPEN_PROGRESS"
               - Luật, Nghị định, Văn bản -> "OPEN_LAWS"
               - Thi thử, Đề thi, Test -> "OPEN_TESTS"
               - Quiz, Luyện tập, Đố vui -> "OPEN_QUIZ"
            
            Nếu User đồng ý với gợi ý về [Chủ đề], bạn PHẢI điền đúng [Mã lệnh] vào trường "command".
            
            Thông tin người dùng: ${userStats}`;

            const modelName = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview";
            const model = genAI.getGenerativeModel({ 
                model: modelName,
                systemInstruction: systemInstructions,
                generationConfig: { responseMimeType: "application/json" }
            });

            // 4. Xây dựng nội dung gửi đi bao gồm lịch sử (tối đa 5 câu gần nhất)
            let historyArray = [];
            try {
                historyArray = typeof history === 'string' ? JSON.parse(history) : (history || []);
            } catch (e) {
                historyArray = [];
            }
            
            let promptContext = `LỊCH SỬ TRÒ CHUYỆN:\n`;
            if (historyArray && historyArray.length > 0) {
                historyArray.forEach(msg => {
                    promptContext += `${msg.isUser ? "User" : "Bot"}: ${msg.text}\n`;
                });
            }
            promptContext += `User: ${message}\nBot: `;

            const reqParts = [promptContext];

            // 5. Xử lý ảnh (nếu có)
            if (req.file) {
                reqParts.push({
                    inlineData: {
                        data: req.file.buffer.toString("base64"),
                        mimeType: req.file.mimetype
                    },
                });
            }

            // 6. Gọi AI và xử lý kết quả
            const result = await model.generateContent(reqParts);
            const response = await result.response;
            const text = response.text();

            try {
                const jsonObj = JSON.parse(text);
                res.json(jsonObj);
            } catch (e) {
                console.error("JSON Parse Error on AI output:", text);
                res.json({ reply: text, command: null });
            }

        } catch (error) {
            console.error("Chatbot Generate Error:", error);

            if (error.status === 429 || error.message.includes("429")) {
                return res.status(429).json({
                    error: 'Hệ thống AI đang quá tải (Hết Quota). Vui lòng thử lại sau 1 phút.'
                });
            }

            res.status(500).json({ error: 'Lỗi khi gọi AI: ' + error.message });
        }
    }
}

module.exports = new ChatbotController();
