const express = require('express');
const router = express.Router();
const chatbotHistoryController = require('../controllers/ChatbotHistoryController');

router.get('/', chatbotHistoryController.getAll.bind(chatbotHistoryController));
router.get('/:id', chatbotHistoryController.getById.bind(chatbotHistoryController));
router.post('/', chatbotHistoryController.create.bind(chatbotHistoryController));
router.put('/:id', chatbotHistoryController.update.bind(chatbotHistoryController));
router.delete('/:id', chatbotHistoryController.delete.bind(chatbotHistoryController));

module.exports = router;
