const lawService = require("../services/lawService");

const getAllCategories = async (req, res) => {
  try {
    const data = await lawService.getAllCategories();
    res.json(data);
  } catch (error) {
    console.error("Error getAllCategories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLawsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await lawService.getLawsByCategoryId(categoryId);
    res.json(data);
  } catch (error) {
    console.error("Error getLawsByCategoryId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLawById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await lawService.getLawById(id);

    if (!data) {
      return res.status(404).json({ message: "Law not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error getLawById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCategories,
  getLawsByCategoryId,
  getLawById
};