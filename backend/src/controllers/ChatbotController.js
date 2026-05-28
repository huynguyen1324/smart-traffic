// File này xử lý phần Chatbot AI thông minh của app chúng ta nè.
// Nó kết nối tới API của OpenAI (hoặc qua OpenRouter) để trả lời các câu hỏi về giao thông, luật lệ
// và thậm chí có thể phân tích cả hình ảnh biển báo mà người dùng tải lên nữa đấy!

const OpenAI = require('openai');
const userStreaksService = require('../services/UserStreaksService');
const fs = require('fs');
const path = require('path');

// Đọc API KEY từ file cấu hình .env
const apiKey = process.env.OPENAI_API_KEY;
// Nếu có API KEY thì khởi tạo đối tượng OpenAI, không thì gán bằng null
const openai = apiKey ? new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:5000", // Cái này bắt buộc nếu dùng OpenRouter nhé
        "X-Title": "Smart Traffic App",         // Tên ứng dụng của tụi mình
    }
}) : null;

// Đoạn này dùng để đọc file hướng dẫn hệ thống (system prompt) cho AI.
// Con AI sẽ dựa vào hướng dẫn này để biết mình đóng vai trò gì (Ví dụ: Chuyên gia luật giao thông thân thiện).
let systemInstructions = "";
try {
    const promptPath = path.join(__dirname, '../config/chatbot_prompt.txt');
    systemInstructions = fs.readFileSync(promptPath, 'utf8');
} catch (error) {
    console.error("Lỗi đọc file system prompt:", error);
    systemInstructions = "Bạn là trợ lý App Giao Thông."; // Nếu lỗi không đọc được file thì dùng câu dự phòng này
}

class ChatbotController {
    // Hàm nhận tin nhắn của người dùng, ảnh chụp (nếu có), lịch sử chat,
    // sau đó đóng gói gửi lên OpenAI và trả về câu trả lời định dạng JSON cho ứng dụng.
    async ask(req, res) {
        try {
            // Kiểm tra xem đã cấu hình khóa API chưa, chưa có thì chịu chết, báo lỗi 500 liền
            if (!openai) {
                return res.status(500).json({ error: 'OPENAI_API_KEY chưa được cấu hình.' });
            }

            // Lấy tin nhắn, mã người dùng và lịch sử trò chuyện từ phần thân request (body)
            const { message, userId, history } = req.body;

            // Nếu người dùng đã đăng nhập (có userId), mình sẽ lấy thêm thông tin chuỗi ngày học (streak)
            // để truyền cho AI biết và khen ngợi hoặc động viên người dùng nhé!
            let userStats = "";
            if (userId) {
                try {
                    const streak = await userStreaksService.getStreak(userId);
                    userStats = `\nThông tin người dùng: Đã học ${streak.current_streak} ngày liên tiếp.`;
                } catch (e) { }
            }

            // Gộp hướng dẫn hệ thống và thông tin học tập của người dùng lại thành prompt tổng thể
            const fullPrompt = systemInstructions + userStats;

            // Lấy tên mô hình AI từ môi trường, mặc định xài bản gpt-4o-mini vừa rẻ vừa ngon
            const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";
            console.log(`[AI] Sử dụng OpenAI mô hình: ${modelName}`);

            // Khởi tạo mảng tin nhắn gửi lên AI, đầu tiên là chỉ thị hệ thống
            const apiMessages = [
                { role: "system", content: fullPrompt }
            ];

            // Chuyển đổi chuỗi lịch sử chat từ client gửi lên thành mảng
            let historyArray = [];
            try {
                historyArray = typeof history === 'string' ? JSON.parse(history) : (history || []);
            } catch (e) { }

            // Giữ lại tối đa 5 câu chat gần nhất thôi cho đỡ tốn token và giữ được ngữ cảnh trò chuyện
            historyArray.slice(-5).forEach(msg => {
                apiMessages.push({
                    role: msg.isUser ? "user" : "assistant",
                    content: msg.text
                });
            });

            // Nội dung tin nhắn hiện tại của người dùng
            const currentUserContent = [{ type: "text", text: message || "Phân tích nội dung này" }];

            // Nếu người dùng gửi kèm ảnh chụp (ví dụ: chụp biển báo trên đường hỏi luật)
            // Chúng mình sẽ mã hóa file ảnh sang chuỗi Base64 và nhét vào tin nhắn gửi cho AI (AI Vision sẽ đọc được)
            if (req.file) {
                const base64Image = req.file.buffer.toString("base64");
                currentUserContent.push({
                    type: "image_url",
                    image_url: {
                        url: `data:${req.file.mimetype};base64,${base64Image}`
                    }
                });
            }

            // Đưa tin nhắn của user hiện tại vào mảng tin nhắn gửi đi
            apiMessages.push({ role: "user", content: currentUserContent });

            // Thực hiện gọi API OpenAI tạo phản hồi
            const completion = await openai.chat.completions.create({
                model: modelName,
                messages: apiMessages,
                response_format: { type: "json_object" }, // Yêu cầu AI trả về kết quả định dạng JSON
            });

            // Lấy chuỗi văn bản kết quả mà AI trả về
            const text = completion.choices[0].message.content;

            try {
                // Parse chuỗi nhận từ AI sang đối tượng JSON để xử lý ở frontend dễ dàng
                const jsonObj = JSON.parse(text);
                const fallback =
                    "Xin lỗi, tôi chưa tạo được nội dung phản hồi. Bạn hỏi lại hoặc thử một câu ngắn hơn nhé.";
                // Đảm bảo phải có trường reply (câu trả lời) hợp lệ, nếu trống thì gán bằng câu trả lời dự phòng
                if (typeof jsonObj.reply !== "string" || !jsonObj.reply.trim()) {
                    jsonObj.reply = fallback;
                }
                res.json(jsonObj); // Trả JSON ngon lành về cho client
            } catch (e) {
                // Nếu AI trả về JSON sai cú pháp, ta bắt lỗi và gửi thẳng chuỗi text đó về luôn
                console.error("OpenAI JSON Parse Error:", text);
                res.json({ reply: text, command: null });
            }

        } catch (error) {
            console.error("OpenAI Chatbot Error:", error);

            // Bắt lỗi khi tài khoản OpenAI hết hạn, hết tiền hoặc bị giới hạn lượt gọi (Rate Limit)
            if (error.status === 429 || error.message.includes("429")) {
                return res.status(429).json({
                    error: 'Hệ thống AI đang quá tải (Hết Quota). Vui lòng thử lại sau 1 phút.'
                });
            }

            // Các lỗi hệ thống khác
            res.status(500).json({ error: 'Lỗi OpenAI: ' + error.message });
        }
    }
}

module.exports = new ChatbotController(); // Xuất Controller ra để dùng ở router
