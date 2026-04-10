const express = require('express');
const router = express.Router();
const a1250QuestionsController = require('../controllers/A1250QuestionsController');

router.get('/', a1250QuestionsController.getAll.bind(a1250QuestionsController));
router.get('/:id', a1250QuestionsController.getById.bind(a1250QuestionsController));
router.post('/', a1250QuestionsController.create.bind(a1250QuestionsController));
router.put('/:id', a1250QuestionsController.update.bind(a1250QuestionsController));
router.delete('/:id', a1250QuestionsController.delete.bind(a1250QuestionsController));

module.exports = router;
