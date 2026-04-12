const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/ChatbotController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ask', upload.single('image'), chatbotController.ask);

module.exports = router;
