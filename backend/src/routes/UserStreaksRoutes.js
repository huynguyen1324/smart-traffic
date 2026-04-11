const express = require('express');
const router = express.Router();
const userStreaksController = require('../controllers/UserStreaksController');

router.get('/:user_id', userStreaksController.get.bind(userStreaksController));
router.post('/:user_id/tick', userStreaksController.update.bind(userStreaksController));

module.exports = router;
