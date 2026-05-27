/**
 * @file A1250QuestionsRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho A1250Questions.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const a1250QuestionsController = require('../controllers/A1250QuestionsController');

router.get('/', a1250QuestionsController.getAll.bind(a1250QuestionsController));
router.get('/:id', a1250QuestionsController.getById.bind(a1250QuestionsController));
module.exports = router;
