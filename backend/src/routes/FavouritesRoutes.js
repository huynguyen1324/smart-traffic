const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/FavouritesController');

router.get('/', favouritesController.getAll.bind(favouritesController));
router.get('/:id', favouritesController.getById.bind(favouritesController));
router.post('/', favouritesController.create.bind(favouritesController));
router.put('/:id', favouritesController.update.bind(favouritesController));
router.delete('/:id', favouritesController.delete.bind(favouritesController));

module.exports = router;
