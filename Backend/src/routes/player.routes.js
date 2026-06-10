const { Router } = require('express');
const playerController = require('../controllers/player.controller');

const router = Router();

router.get('/', playerController.listPlayers);
router.get('/:id', playerController.showPlayer);
router.post('/', playerController.storePlayer);

module.exports = router;
