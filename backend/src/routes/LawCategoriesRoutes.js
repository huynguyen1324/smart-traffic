/**
 * @file LawCategoriesRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho LawCategories.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const lawCategoriesController = require('../controllers/LawCategoriesController');

router.get('/', lawCategoriesController.getAll.bind(lawCategoriesController));
router.get('/:id', lawCategoriesController.getById.bind(lawCategoriesController));
module.exports = router;
