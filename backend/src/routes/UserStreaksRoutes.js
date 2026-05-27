/**
 * @file UserStreaksRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho UserStreaks.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const userStreaksController = require('../controllers/UserStreaksController');

router.get('/:user_id', userStreaksController.get.bind(userStreaksController));
router.post('/:user_id/tick', userStreaksController.update.bind(userStreaksController));

module.exports = router;
