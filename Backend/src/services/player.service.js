const { players } = require('../data/players.data');

function getAllPlayers() {
  return players;
}

function getPlayerById(id) {
  return players.find((player) => player.id === Number(id));
}

function createPlayer(payload) {
  const player = {
    id: players.length ? Math.max(...players.map((item) => item.id)) + 1 : 1,
    nombre: payload.nombre || 'Jugador sin nombre',
    nivel: payload.nivel || 'Principiante',
    puntaje: Number(payload.puntaje || 0),
  };

  players.push(player);
  return player;
}

module.exports = { getAllPlayers, getPlayerById, createPlayer };
