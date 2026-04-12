const express = require('express');
const router = express.Router();
const b2600QuestionsController = require('../controllers/B2600QuestionsController');

router.get('/', b2600QuestionsController.getAll.bind(b2600QuestionsController));
router.get('/:id', b2600QuestionsController.getById.bind(b2600QuestionsController));
module.exports = router;
