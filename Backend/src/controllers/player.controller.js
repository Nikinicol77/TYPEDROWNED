const playerService = require('../services/player.service');

function listPlayers(_req, res) {
  res.status(200).json(playerService.getAllPlayers());
}

function showPlayer(req, res) {
  const player = playerService.getPlayerById(req.params.id);

  if (!player) {
    return res.status(404).json({ message: 'Jugador no encontrado' });
  }

  return res.status(200).json(player);
}

function storePlayer(req, res) {
  const player = playerService.createPlayer(req.body);
  return res.status(201).json(player);
}

module.exports = { listPlayers, showPlayer, storePlayer };
