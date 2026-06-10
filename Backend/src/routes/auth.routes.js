const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.get('/usuarios', authController.listUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/recover', authController.recoverPassword);

module.exports = router;
