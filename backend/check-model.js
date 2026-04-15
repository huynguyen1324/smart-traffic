require('dotenv').config();
const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey || apiKey.startsWith('AIzaSy')) {
  console.error("❌ Lỗi: Bạn chưa cấu hình OPENAI_API_KEY hợp lệ trong file .env");
  console.error("Vui lòng thay thế Key Gemini cũ bằng OpenAI API Key.");
  process.exit(1);
}

const openai = new OpenAI({ 
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
});

async function listModels() {
  try {
    const response = await openai.models.list();
    
    console.log("\n--- CÁC MÔ HÌNH OPENAI KHẢ DỤNG ---");
    
    // Lọc ra các dòng GPT chính để dễ nhìn
    const models = response.data
      .map(m => m.id)
      .filter(id => id.includes("gpt") && !id.includes("vision") && !id.includes("instruct"))
      .sort();

    models.forEach((id) => {
      console.log(`- ${id}`);
    });
    
    console.log("----------------------------------\n");
    console.log("Gợi ý: Bạn nên sử dụng 'gpt-4o-mini' để có tốc độ nhanh và chi phí thấp nhất.");
  } catch (error) {
    if (error.status === 401) {
      console.error("❌ Lỗi 401: API Key không chính xác hoặc đã hết hạn.");
    } else {
      console.error("❌ Lỗi kết nối OpenAI:", error.message);
    }
  }
}

listModels();