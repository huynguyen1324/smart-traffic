// Chào mừng bạn đến với file khởi tạo server chính!
// Đây là nơi bắt đầu mọi thứ của ứng dụng backend Node.js.

require('dotenv').config(); // Load các biến môi trường từ file .env nha
const express = require('express'); // Import thư viện Express thần thánh để tạo API
const cors = require('cors'); // Cho phép CORS để frontend kết nối dễ dàng
const pool = require('./config/db'); // Import kết nối database MySQL

// Import tất tần tật các file routes xử lý request
const a1250QuestionsRoutes = require('./routes/A1250QuestionsRoutes');
const b2600QuestionsRoutes = require('./routes/B2600QuestionsRoutes');
const lawCategoriesRoutes = require('./routes/LawCategoriesRoutes');
const lawsRoutes = require('./routes/LawsRoutes');
const signCategoriesRoutes = require('./routes/SignCategoriesRoutes');
const signsRoutes = require('./routes/SignsRoutes');
const testResultsRoutes = require('./routes/TestResultsRoutes');
const usersRoutes = require('./routes/UsersRoutes');
const userStreaksRoutes = require('./routes/UserStreaksRoutes');
const quizRoutes = require('./routes/QuizRoutes');
const chatbotRoutes = require('./routes/ChatbotRoutes');
const drivingTestCentersRoutes = require('./routes/DrivingTestCentersRoutes');

const app = express(); // Khởi tạo ứng dụng express

// Cấu hình middleware
app.use(cors()); // Mở cổng cho mọi request từ bên ngoài vào
app.use(express.json()); // Đọc dữ liệu dạng JSON gửi lên từ client
app.use('/images', express.static('public/images')); // Cung cấp đường dẫn tĩnh để xem ảnh biển báo, câu hỏi các thứ

// Đăng ký các API routes tương ứng
app.use('/api/a1-250-questions', a1250QuestionsRoutes); // API câu hỏi bằng lái A1 (250 câu)
app.use('/api/b2-600-questions', b2600QuestionsRoutes); // API câu hỏi bằng lái B2 (600 câu)
app.use('/api/law-categories', lawCategoriesRoutes); // API danh mục luật giao thông
app.use('/api/laws', lawsRoutes); // API chi tiết luật giao thông
app.use('/api/sign-categories', signCategoriesRoutes); // API nhóm biển báo giao thông
app.use('/api/signs', signsRoutes); // API chi tiết biển báo giao thông
app.use('/api/test-results', testResultsRoutes); // API kết quả thi thử
app.use('/api/users', usersRoutes); // API quản lý người dùng
app.use('/api/quizzes', quizRoutes); // API câu hỏi trắc nghiệm
app.use('/api/streaks', userStreaksRoutes); // API theo dõi chuỗi ngày học của người dùng
app.use('/api/chatbot', chatbotRoutes); // API chatbot tư vấn luật
app.use('/api/driving-test-centers', drivingTestCentersRoutes); // API địa điểm thi bằng lái

// Endpoint mặc định chỉ để kiểm tra xem server có sống hay không
app.get('/', (req, res) => res.json({ message: 'Smart Traffic API - Spring Boot Architecture' }));

const PORT = process.env.PORT || 5000; // Lấy cổng từ file cấu hình hoặc mặc định chạy ở cổng 5000
app.listen(PORT, '0.0.0.0', async () => {
    try {
        // Thử kết nối với database xem có thông không
        const conn = await pool.getConnection();
        console.log("✅ MySQL connected");
        conn.release(); // Giải phóng kết nối sau khi test xong
        console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    } catch (err) {
        // Báo lỗi ngay nếu không kết nối được database
        console.error("❌ DB connection failed:", err.message);
    }
});
