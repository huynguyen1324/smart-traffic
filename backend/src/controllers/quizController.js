const quizService = require("../services/quizService");

// ===== NEW =====

const getTestList = async (req, res) => {
  try {
    const { license } = req.params;
    const data = await quizService.getTestList(license);
    res.json(data);
  } catch (error) {
    console.error("Error getTestList:", error);
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsByTest = async (req, res) => {
  try {
    const { license, testNumber } = req.params;
    const data = await quizService.getQuestionsByTest(
      license,
      testNumber
    );
    res.json(data);
  } catch (error) {
    console.error("Error getQuestionsByTest:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===== EXISTING =====

const getAllQuestions = async (req, res) => {
  try {
    const { license } = req.params;
    const data = await quizService.getAllQuestions(license);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsByType = async (req, res) => {
  try {
    const { license, type } = req.params;
    const data = await quizService.getQuestionsByType(license, type);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsByTypeAndCategory = async (req, res) => {
  try {
    const { license, type, categoryId } = req.params;
    
    // Xử lý lỗi lệch ID giữa bảng law_categories (11, 12...) và questions (1, 2...)
    let mappedCategoryId = parseInt(categoryId, 10);
    if (type === "Law" && mappedCategoryId > 10) {
      mappedCategoryId -= 10;
    }

    const data = await quizService.getQuestionsByTypeAndCategory(
      license,
      type,
      mappedCategoryId
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { license, id } = req.params;
    const data = await quizService.getQuestionById(license, id);

    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuizResult = async (req, res) => {
  try {
    const { user_id, answers } = req.body;

    if (!user_id || !Array.isArray(answers)) {
      return res.status(400).json({
        message: "user_id and answers are required"
      });
    }

    const result = await quizService.submitQuizResult(user_id, answers);

    res.status(201).json({
      message: "Quiz result saved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTestList,
  getQuestionsByTest,
  getAllQuestions,
  getQuestionsByType,
  getQuestionsByTypeAndCategory,
  getQuestionById,
  submitQuizResult
};