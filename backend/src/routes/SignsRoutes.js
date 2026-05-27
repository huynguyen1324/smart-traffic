/**
 * @file SignsRoutes.js
 * @description Định nghĩa các luồng định tuyến (Router) HTTP API cho Signs.
 * @module Backend
 */

const express = require('express');
const router = express.Router();
const signsController = require('../controllers/SignsController');

router.get('/', signsController.getAll.bind(signsController));
router.get('/:id', signsController.getById.bind(signsController));
module.exports = router;
