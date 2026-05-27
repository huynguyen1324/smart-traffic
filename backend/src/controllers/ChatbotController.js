/**
 * @file ChatbotController.js
 * @description Controller điều phối yêu cầu HTTP API liên quan đến Chatbot.
 * @module Backend
 */

const OpenAI = require('openai');
const userStreaksService = require('../services/UserStreaksService');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:5000", // Bắt buộc cho OpenRouter
        "X-Title": "Smart Traffic App",         // Tên app của bạn
    }
}) : null;

let systemInstructions = "";
try {
    const promptPath = path.join(__dirname, '../config/chatbot_prompt.txt');
    systemInstructions = fs.readFileSync(promptPath, 'utf8');
} catch (error) {
    console.error("Lỗi đọc file system prompt:", error);
    systemInstructions = "Bạn là trợ lý App Giao Thông.";
}

/**
 * Lớp ChatbotController
 * Controller điều phối yêu cầu HTTP API liên quan đến Chatbot.
 */
class ChatbotController {
    /**
 * Hàm ask nhận tin nhắn người dùng và ảnh (nếu có), gọi API OpenAI / OpenRouter để nhận câu trả lời dạng JSON
 * @param {Object} req - Request chứa body { message, userId, history } và file upload ảnh
 * @param {Object} res - Response phản hồi về app dưới dạng JSON
 */
    async ask(req, res) {
        try {
            // Kiểm tra xem khóa API OpenAI đã được cấu hình thành công hay chưa
            if (!openai) {
                return res.status(500).json({ error: 'OPENAI_API_KEY chưa được cấu hình.' });
            }

            const { message, userId, history } = req.body;

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

            const apiMessages = [
                { role: "system", content: fullPrompt }
            ];

            let historyArray = [];
            try {
                historyArray = typeof history === 'string' ? JSON.parse(history) : (history || []);
            } catch (e) { }

            // Lấy tối đa 5 câu hội thoại trước đó trong lịch sử để giữ ngữ cảnh
            historyArray.slice(-5).forEach(msg => {
                apiMessages.push({
                    role: msg.isUser ? "user" : "assistant",
                    content: msg.text
                });
            });

            const currentUserContent = [{ type: "text", text: message || "Phân tích nội dung này" }];

            // Nếu người dùng tải kèm ảnh chụp (ví dụ biển báo), mã hóa sang Base64 để gửi cho AI thị giác
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

            // Gọi API tạo câu trả lời từ AI tích hợp
            const completion = await openai.chat.completions.create({
                model: modelName,
                messages: apiMessages,
                response_format: { type: "json_object" },
            });

            const text = completion.choices[0].message.content;

            try {
                // Phân tích cú pháp chuỗi JSON trả về từ AI để phản hồi chuẩn giao thức
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
