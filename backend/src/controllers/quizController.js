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
    const { license, test_id } = req.params;
    const data = await quizService.getQuestionsByTest(
      license,
      test_id
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
    const { license, type, category_id } = req.params;
    const data = await quizService.getQuestionsByTypeAndCategory(
      license,
      type,
      category_id
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

const saveQuizDetail = async (req, res) => {
  try {
    const { user_id, license, question_id, chosen_option, correct } = req.body;
    const result = await quizService.saveQuizDetail(user_id, license, question_id, chosen_option, correct);
    res.json({ message: "Detail saved", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizStats = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await quizService.getQuizStats(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizDetails = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await quizService.getQuizDetails(user_id);
    res.json(data);
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
  submitQuizResult,
  saveQuizDetail,
  getQuizStats,
  getQuizDetails
};