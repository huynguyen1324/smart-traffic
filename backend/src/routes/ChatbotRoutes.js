/**
 * @file ChatbotRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho Chatbot.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/ChatbotController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ask', upload.single('image'), chatbotController.ask);

module.exports = router;
