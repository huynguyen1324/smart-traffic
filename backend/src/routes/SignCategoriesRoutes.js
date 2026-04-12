const express = require('express');
const router = express.Router();
const signCategoriesController = require('../controllers/SignCategoriesController');

router.get('/', signCategoriesController.getAll.bind(signCategoriesController));
router.get('/:id', signCategoriesController.getById.bind(signCategoriesController));
module.exports = router;
