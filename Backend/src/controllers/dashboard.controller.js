const dashboardService = require('../services/dashboard.service');

async function ranking(_req, res, next) {
  try {
    const rows = await dashboardService.getRanking();
    res.status(200).json({ ok: true, ranking: rows });
  } catch (error) {
    next(error);
  }
}

async function profile(req, res, next) {
  try {
    const response = await dashboardService.getProfile(req.params.usuarioId);
    res.status(response.ok ? 200 : 404).json(response);
  } catch (error) {
    next(error);
  }
}

async function adminSummary(_req, res, next) {
  try {
    const response = await dashboardService.getAdminSummary();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const response = await dashboardService.deleteUser(req.params.usuarioId);
    res.status(response.ok ? 200 : 404).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = { ranking, profile, adminSummary, deleteUser };
