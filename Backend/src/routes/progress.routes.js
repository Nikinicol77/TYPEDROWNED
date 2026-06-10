const { Router } = require('express');
const progressController = require('../controllers/progress.controller');

const router = Router();

router.get('/:usuarioId', progressController.getUserProgress);
router.get('/:usuarioId/nivel/:nivel', progressController.getUserLevelProgress);
router.put('/', progressController.saveUserProgress);
router.post('/', progressController.saveUserProgress);

module.exports = router;
