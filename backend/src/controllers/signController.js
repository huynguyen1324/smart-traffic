const signService = require("../services/signService");

const getAllCategories = async (req, res) => {
  try {
    const data = await signService.getAllCategories();
    res.json(data);
  } catch (error) {
    console.error("Error getAllCategories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSignsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await signService.getSignsByCategoryId(categoryId);
    res.json(data);
  } catch (error) {
    console.error("Error getSignsByCategoryId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSignById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await signService.getSignById(id);

    if (!data) {
      return res.status(404).json({ message: "Sign not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error getSignById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCategories,
  getSignsByCategoryId,
  getSignById
};