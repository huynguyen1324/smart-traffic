const API_KEY = "AIzaSyDawuq5jhucIS_wKP0OBUHdBv7LdxEbSNA";

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("Lỗi API:", data.error.message);
      return;
    }

    console.log("--- CÁC MÔ HÌNH BẠN CÓ THỂ SỬ DỤNG ---");
    data.models.forEach((model) => {
      // Chỉ lọc ra các mô hình hỗ trợ tạo nội dung (generateContent)
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Model ID: ${model.name.replace("models/", "")}`);
      }
    });
    console.log("---------------------------------------");
  } catch (error) {
    console.error("Lỗi kết nối:", error);
  }
}

listModels();