/**
 * @file SignCategoriesRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho SignCategories.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const signCategoriesController = require('../controllers/SignCategoriesController');

router.get('/', signCategoriesController.getAll.bind(signCategoriesController));
router.get('/:id', signCategoriesController.getById.bind(signCategoriesController));
module.exports = router;
