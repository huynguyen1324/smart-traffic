const express = require('express');
const router = express.Router();
const testResultsController = require('../controllers/TestResultsController');

router.get('/', testResultsController.getAll.bind(testResultsController));
router.get('/:id', testResultsController.getById.bind(testResultsController));
router.post('/', testResultsController.create.bind(testResultsController));
router.put('/:id', testResultsController.update.bind(testResultsController));
router.delete('/:id', testResultsController.delete.bind(testResultsController));

module.exports = router;
