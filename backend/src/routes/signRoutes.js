const express = require("express");
const router = express.Router();
const signController = require("../controllers/signController");

router.get("/categories", signController.getAllCategories);
router.get("/category/:categoryId", signController.getSignsByCategoryId);
router.get("/:id", signController.getSignById);

module.exports = router;