const { Router } = require('express');
const playerRoutes = require('./player.routes');
const authRoutes = require('./auth.routes');
const progressRoutes = require('./progress.routes');
const dashboardRoutes = require('./dashboard.routes');

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    mensaje: 'Servidor funcionando correctamente',
    proyecto: 'TypeQuest',
    rutas: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/usuarios',
      'GET /api/jugadores',
      'GET /api/jugadores/:id',
      'GET /api/progreso/:usuarioId',
      'GET /api/progreso/:usuarioId/nivel/:nivel',
      'PUT /api/progreso',
      'POST /api/jugadores',
      'GET /api/dashboard/ranking',
      'GET /api/dashboard/perfil/:usuarioId',
      'GET /api/dashboard/admin',
    ],
  });
});

router.use('/auth', authRoutes);
router.use('/jugadores', playerRoutes);
router.use('/progreso', progressRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
