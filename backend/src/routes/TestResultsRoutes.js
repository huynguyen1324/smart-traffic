const express = require('express');
const router = express.Router();
const testResultsController = require('../controllers/TestResultsController');

router.get('/user/:user_id', testResultsController.getByUserId.bind(testResultsController));
router.post('/', testResultsController.create.bind(testResultsController));

module.exports = router;
