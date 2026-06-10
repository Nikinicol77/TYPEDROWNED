const authService = require('../services/auth.service');

async function listUsers(_req, res, next) {
  try {
    const users = await authService.getPublicUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const response = await authService.register(req.body);
    res.status(response.ok ? 201 : 400).json(response);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const response = await authService.login(req.body);
    res.status(response.ok ? 200 : 401).json(response);
  } catch (error) {
    next(error);
  }
}

async function recoverPassword(req, res, next) {
  try {
    const response = await authService.recoverPassword(req.body);
    res.status(response.ok ? 200 : 400).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = { listUsers, register, login, recoverPassword };
