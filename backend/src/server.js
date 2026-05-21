require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

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

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

// Routes
app.use('/api/a1-250-questions', a1250QuestionsRoutes);
app.use('/api/b2-600-questions', b2600QuestionsRoutes);
app.use('/api/law-categories', lawCategoriesRoutes);
app.use('/api/laws', lawsRoutes);
app.use('/api/sign-categories', signCategoriesRoutes);
app.use('/api/signs', signsRoutes);
app.use('/api/test-results', testResultsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/streaks', userStreaksRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/driving-test-centers', drivingTestCentersRoutes);

app.get('/', (req, res) => res.json({ message: 'Smart Traffic API - Spring Boot Architecture' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ MySQL connected");
        conn.release();
        console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    } catch (err) {
        console.error("❌ DB connection failed:", err.message);
    }
});
