const { pool } = require('../database/mysql.connection');

const MIN_SUBLEVEL = 1;
const MAX_SUBLEVEL = 20;
const LEVEL_UNLOCK_REQUIREMENT = Object.freeze({
  2: { previousLevel: 1, requiredSublevel: 10 },
  3: { previousLevel: 2, requiredSublevel: 10 },
});

function normalizeInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeSublevel(value) {
  const parsed = normalizeInteger(value, MIN_SUBLEVEL);
  return Math.min(Math.max(parsed, MIN_SUBLEVEL), MAX_SUBLEVEL);
}

function normalizeLevel(value) {
  const parsed = normalizeInteger(value, 1);
  return Math.min(Math.max(parsed, 1), 3);
}

function normalizePercent(value) {
  return Math.min(Math.max(normalizeInteger(value, 0), 0), 100);
}

async function ensureUserExists(usuarioId) {
  const [users] = await pool.execute('SELECT id FROM usuarios WHERE id = ? LIMIT 1', [usuarioId]);
  return users.length > 0;
}

async function getCompletedByLevel(usuarioId) {
  const [rows] = await pool.execute(
    `SELECT nivel, MAX(subnivel) AS ultimo_completado
     FROM partidas
     WHERE usuario_id = ? AND completado = 1 AND subnivel IS NOT NULL
     GROUP BY nivel`,
    [usuarioId]
  );

  const completed = { 1: 0, 2: 0, 3: 0 };
  rows.forEach((row) => {
    const nivel = normalizeLevel(row.nivel);
    completed[nivel] = Math.max(completed[nivel], normalizeInteger(row.ultimo_completado, 0));
  });

  return completed;
}

function buildUnlocks(completed) {
  return {
    1: true,
    2: completed[1] >= LEVEL_UNLOCK_REQUIREMENT[2].requiredSublevel,
    3: completed[2] >= LEVEL_UNLOCK_REQUIREMENT[3].requiredSublevel,
  };
}

async function updateUserStars(usuarioId) {
  const [rows] = await pool.execute(
    `SELECT COALESCE(SUM(estrellas_obtenidas), 0) AS total
     FROM partidas
     WHERE usuario_id = ? AND completado = 1`,
    [usuarioId]
  );

  const total = normalizeInteger(rows[0]?.total, 0);
  await pool.execute('UPDATE usuarios SET estrellas = ? WHERE id = ?', [total, usuarioId]);
  return total;
}

async function getProgress(usuarioId) {
  const userId = normalizeInteger(usuarioId, 0);

  if (!userId) {
    return { ok: false, message: 'Usuario inválido.' };
  }

  const userExists = await ensureUserExists(userId);
  if (!userExists) {
    return { ok: false, message: 'El usuario no existe.' };
  }

  const completed = await getCompletedByLevel(userId);
  const niveles = { 1: 1, 2: 1, 3: 1 };

  Object.keys(niveles).forEach((level) => {
    const cleanLevel = Number(level);
    niveles[cleanLevel] = Math.min((completed[cleanLevel] || 0) + 1, MAX_SUBLEVEL);
  });

  return {
    ok: true,
    usuario_id: userId,
    niveles,
    completados: completed,
    desbloqueados: buildUnlocks(completed),
    requisitos: LEVEL_UNLOCK_REQUIREMENT,
  };
}

async function getLevelProgress(usuarioId, nivel) {
  const progress = await getProgress(usuarioId);
  if (!progress.ok) return progress;

  const cleanLevel = normalizeLevel(nivel);

  return {
    ok: true,
    usuario_id: progress.usuario_id,
    nivel: cleanLevel,
    subnivel_maximo: progress.niveles[cleanLevel] || 1,
    ultimo_completado: progress.completados[cleanLevel] || 0,
    nivel_desbloqueado: progress.desbloqueados[cleanLevel] || false,
    requisitos: progress.requisitos,
  };
}

async function saveProgress(payload) {
  const usuarioId = normalizeInteger(payload.usuario_id || payload.userId, 0);
  const nivel = normalizeLevel(payload.nivel);
  const subnivelMaximo = normalizeSublevel(payload.subnivel_maximo || payload.subnivelMaximo || payload.subnivel);
  const subnivelActual = normalizeSublevel(payload.subnivel || Math.max(subnivelMaximo - 1, 1));
  const wpm = normalizeInteger(payload.wpm, 0);
  const precision = normalizePercent(payload.precision || payload.precision_porcentaje || payload.acc);
  const tiempoUsado = normalizeInteger(payload.tiempo_usado || payload.tiempoUsado, 0);
  const gano = Boolean(payload.gano ?? payload.won ?? payload.completado);
  const completado = Boolean(payload.completado ?? gano);

  if (!usuarioId) {
    return { ok: false, message: 'Usuario inválido.' };
  }

  const userExists = await ensureUserExists(usuarioId);
  if (!userExists) {
    return { ok: false, message: 'El usuario no existe.' };
  }

  const estrellas = completado ? 1 : 0;

  await pool.execute(
    `INSERT INTO partidas
      (usuario_id, nivel, subnivel, estrellas_obtenidas, completado, wpm, precision_porcentaje, tiempo_usado, gano)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [usuarioId, nivel, subnivelActual, estrellas, completado ? 1 : 0, wpm, precision, tiempoUsado, gano ? 1 : 0]
  );

  const estrellasTotales = await updateUserStars(usuarioId);
  const levelProgress = await getLevelProgress(usuarioId, nivel);

  return {
    ...levelProgress,
    message: completado ? 'Progreso guardado en MySQL.' : 'Partida registrada en MySQL.',
    estrellas: estrellasTotales,
  };
}

module.exports = {
  getProgress,
  getLevelProgress,
  saveProgress,
  LEVEL_UNLOCK_REQUIREMENT,
};
