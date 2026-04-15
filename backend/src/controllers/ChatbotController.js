const OpenAI = require('openai');
const userStreaksService = require('../services/UserStreaksService');
const fs = require('fs');
const path = require('path');

// 1. Khởi tạo OpenAI (Tương thích OpenRouter)
const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:5000", // Bắt buộc cho OpenRouter
        "X-Title": "Smart Traffic App",         // Tên app của bạn
    }
}) : null;

// Tải System Prompt từ file
let systemInstructions = "";
try {
    const promptPath = path.join(__dirname, '../config/chatbot_prompt.txt');
    systemInstructions = fs.readFileSync(promptPath, 'utf8');
} catch (error) {
    console.error("Lỗi đọc file system prompt:", error);
    systemInstructions = "Bạn là trợ lý App Giao Thông.";
}

class ChatbotController {
    async ask(req, res) {
        try {
            if (!openai) {
                return res.status(500).json({ error: 'OPENAI_API_KEY chưa được cấu hình.' });
            }

            const { message, userId, history } = req.body;

            // 2. Lấy thông tin tiến độ người dùng
            let userStats = "";
            if (userId) {
                try {
                    const streak = await userStreaksService.getStreak(userId);
                    userStats = `\nThông tin người dùng: Đã học ${streak.current_streak} ngày liên tiếp.`;
                } catch (e) { }
            }

            const fullPrompt = systemInstructions + userStats;

            const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";
            console.log(`[AI] Sử dụng OpenAI mô hình: ${modelName}`);

            // 4. Xây dựng nội dung gửi đi (Messages)
            const apiMessages = [
                { role: "system", content: fullPrompt }
            ];

            // Thêm lịch sử (5 câu gần nhất)
            let historyArray = [];
            try {
                historyArray = typeof history === 'string' ? JSON.parse(history) : (history || []);
            } catch (e) { }

            historyArray.slice(-5).forEach(msg => {
                apiMessages.push({
                    role: msg.isUser ? "user" : "assistant",
                    content: msg.text
                });
            });

            // Tin nhắn hiện tại (Xử lý văn bản + Ảnh)
            const currentUserContent = [{ type: "text", text: message || "Phân tích nội dung này" }];

            if (req.file) {
                const base64Image = req.file.buffer.toString("base64");
                currentUserContent.push({
                    type: "image_url",
                    image_url: {
                        url: `data:${req.file.mimetype};base64,${base64Image}`
                    }
                });
            }

            apiMessages.push({ role: "user", content: currentUserContent });

            // 5. Gọi OpenAI API
            const completion = await openai.chat.completions.create({
                model: modelName,
                messages: apiMessages,
                response_format: { type: "json_object" },
            });

            const text = completion.choices[0].message.content;

            try {
                const jsonObj = JSON.parse(text);
                const fallback =
                    "Xin lỗi, tôi chưa tạo được nội dung phản hồi. Bạn hỏi lại hoặc thử một câu ngắn hơn nhé.";
                if (typeof jsonObj.reply !== "string" || !jsonObj.reply.trim()) {
                    jsonObj.reply = fallback;
                }
                res.json(jsonObj);
            } catch (e) {
                console.error("OpenAI JSON Parse Error:", text);
                res.json({ reply: text, command: null });
            }

        } catch (error) {
            console.error("OpenAI Chatbot Error:", error);

            if (error.status === 429 || error.message.includes("429")) {
                return res.status(429).json({
                    error: 'Hệ thống AI đang quá tải (Hết Quota). Vui lòng thử lại sau 1 phút.'
                });
            }

            res.status(500).json({ error: 'Lỗi OpenAI: ' + error.message });
        }
    }
}

module.exports = new ChatbotController();
