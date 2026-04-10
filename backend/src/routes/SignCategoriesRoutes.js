const express = require('express');
const router = express.Router();
const signCategoriesController = require('../controllers/SignCategoriesController');

router.get('/', signCategoriesController.getAll.bind(signCategoriesController));
router.get('/:id', signCategoriesController.getById.bind(signCategoriesController));
router.post('/', signCategoriesController.create.bind(signCategoriesController));
router.put('/:id', signCategoriesController.update.bind(signCategoriesController));
router.delete('/:id', signCategoriesController.delete.bind(signCategoriesController));

module.exports = router;
