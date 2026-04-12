const express = require('express');
const router = express.Router();
const signsController = require('../controllers/SignsController');

router.get('/', signsController.getAll.bind(signsController));
router.get('/:id', signsController.getById.bind(signsController));
module.exports = router;
