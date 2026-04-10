const express = require('express');
const router = express.Router();
const signsController = require('../controllers/SignsController');

router.get('/', signsController.getAll.bind(signsController));
router.get('/:id', signsController.getById.bind(signsController));
router.post('/', signsController.create.bind(signsController));
router.put('/:id', signsController.update.bind(signsController));
router.delete('/:id', signsController.delete.bind(signsController));

module.exports = router;
