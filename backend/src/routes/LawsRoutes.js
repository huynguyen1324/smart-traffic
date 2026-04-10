const express = require('express');
const router = express.Router();
const lawsController = require('../controllers/LawsController');

router.get('/', lawsController.getAll.bind(lawsController));
router.get('/:id', lawsController.getById.bind(lawsController));
router.post('/', lawsController.create.bind(lawsController));
router.put('/:id', lawsController.update.bind(lawsController));
router.delete('/:id', lawsController.delete.bind(lawsController));

module.exports = router;
