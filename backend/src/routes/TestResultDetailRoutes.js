const express = require('express');
const router = express.Router();
const testResultDetailController = require('../controllers/TestResultDetailController');

router.get('/', testResultDetailController.getAll.bind(testResultDetailController));
router.get('/:id', testResultDetailController.getById.bind(testResultDetailController));
router.post('/', testResultDetailController.create.bind(testResultDetailController));
router.put('/:id', testResultDetailController.update.bind(testResultDetailController));
router.delete('/:id', testResultDetailController.delete.bind(testResultDetailController));

module.exports = router;
