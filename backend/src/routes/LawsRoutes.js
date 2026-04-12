const express = require('express');
const router = express.Router();
const lawsController = require('../controllers/LawsController');

router.get('/', lawsController.getAll.bind(lawsController));
router.get('/category/:category_id', lawsController.getByCategory.bind(lawsController));
router.get('/:id', lawsController.getById.bind(lawsController));
module.exports = router;
