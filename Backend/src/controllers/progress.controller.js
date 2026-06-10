const progressService = require('../services/progress.service');

async function getUserProgress(req, res, next) {
  try {
    const result = await progressService.getProgress(req.params.usuarioId);
    res.status(result.ok ? 200 : 400).json(result);
  } catch (error) {
    next(error);
  }
}

async function getUserLevelProgress(req, res, next) {
  try {
    const result = await progressService.getLevelProgress(req.params.usuarioId, req.params.nivel);
    res.status(result.ok ? 200 : 400).json(result);
  } catch (error) {
    next(error);
  }
}

async function saveUserProgress(req, res, next) {
  try {
    const result = await progressService.saveProgress(req.body);
    res.status(result.ok ? 200 : 400).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserProgress,
  getUserLevelProgress,
  saveUserProgress,
};
