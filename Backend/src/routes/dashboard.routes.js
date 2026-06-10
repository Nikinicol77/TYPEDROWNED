const { Router } = require('express');
const dashboardController = require('../controllers/dashboard.controller');

const router = Router();

router.get('/ranking', dashboardController.ranking);
router.get('/perfil/:usuarioId', dashboardController.profile);
router.get('/admin', dashboardController.adminSummary);
router.delete('/admin/usuarios/:usuarioId', dashboardController.deleteUser);

module.exports = router;
