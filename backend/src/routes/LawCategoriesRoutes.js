const express = require('express');
const router = express.Router();
const lawCategoriesController = require('../controllers/LawCategoriesController');

router.get('/', lawCategoriesController.getAll.bind(lawCategoriesController));
router.get('/:id', lawCategoriesController.getById.bind(lawCategoriesController));
router.post('/', lawCategoriesController.create.bind(lawCategoriesController));
router.put('/:id', lawCategoriesController.update.bind(lawCategoriesController));
router.delete('/:id', lawCategoriesController.delete.bind(lawCategoriesController));

module.exports = router;
