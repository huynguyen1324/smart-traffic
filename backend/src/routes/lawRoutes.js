const express = require("express");
const router = express.Router();
const lawController = require("../controllers/lawController");

router.get("/categories", lawController.getAllCategories);
router.get("/category/:categoryId", lawController.getLawsByCategoryId);
router.get("/:id", lawController.getLawById);

module.exports = router;