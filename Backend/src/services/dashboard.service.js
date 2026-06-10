const { pool } = require('../database/mysql.connection');

async function getRanking() {
  const [rows] = await pool.execute(`
    SELECT
      u.id,
      u.nombre,
      u.username,
      u.correo,
      u.estrellas,
      COUNT(CASE WHEN p.completado = 1 THEN 1 END) AS subniveles_completados,
      COUNT(DISTINCT CASE WHEN p.completado = 1 THEN p.nivel END) AS niveles_con_avance,
      COALESCE(MAX(p.wpm), 0) AS mejor_wpm,
      COALESCE(MAX(p.precision_porcentaje), 0) AS mejor_precision,
      MAX(p.fecha_partida) AS ultima_partida
    FROM usuarios u
    LEFT JOIN partidas p ON p.usuario_id = u.id
    GROUP BY u.id, u.nombre, u.username, u.correo, u.estrellas
    ORDER BY subniveles_completados DESC, mejor_wpm DESC, mejor_precision DESC, u.estrellas DESC
  `);

  return rows;
}

async function getProfile(usuarioId) {
  const [users] = await pool.execute(
    `SELECT id, nombre, username, correo, estrellas, rol, fecha_creacion
     FROM usuarios
     WHERE id = ?
     LIMIT 1`,
    [usuarioId]
  );

  if (!users.length) {
    return { ok: false, message: 'Usuario no encontrado.' };
  }

  const [progress] = await pool.execute(
    `SELECT
      nivel,
      COALESCE(MAX(CASE WHEN completado = 1 THEN subnivel END), 0) AS ultimo_subnivel,
      COUNT(CASE WHEN completado = 1 THEN 1 END) AS subniveles_completados,
      COALESCE(MAX(wpm), 0) AS mejor_wpm,
      COALESCE(MAX(precision_porcentaje), 0) AS mejor_precision
     FROM partidas
     WHERE usuario_id = ?
     GROUP BY nivel
     ORDER BY nivel`,
    [usuarioId]
  );

  const [lastMatches] = await pool.execute(
    `SELECT id, nivel, subnivel, wpm, precision_porcentaje, tiempo_usado, completado, gano, fecha_partida
     FROM partidas
     WHERE usuario_id = ?
     ORDER BY fecha_partida DESC
     LIMIT 10`,
    [usuarioId]
  );

  return {
    ok: true,
    usuario: users[0],
    progreso: progress,
    partidas: lastMatches,
  };
}

async function getAdminSummary() {
  const ranking = await getRanking();
  const [stats] = await pool.execute(`
    SELECT
      COUNT(DISTINCT u.id) AS usuarios,
      COUNT(p.id) AS partidas,
      COUNT(CASE WHEN p.completado = 1 THEN 1 END) AS partidas_ganadas,
      COALESCE(MAX(p.wpm), 0) AS mejor_wpm_general
    FROM usuarios u
    LEFT JOIN partidas p ON p.usuario_id = u.id
  `);

  const [matches] = await pool.execute(`
    SELECT p.id, u.nombre, u.username, p.nivel, p.subnivel, p.wpm, p.precision_porcentaje, p.tiempo_usado, p.completado, p.fecha_partida
    FROM partidas p
    INNER JOIN usuarios u ON u.id = p.usuario_id
    ORDER BY p.fecha_partida DESC
    LIMIT 30
  `);

  return { ok: true, resumen: stats[0], usuarios: ranking, partidas: matches };
}

async function deleteUser(usuarioId) {
  const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [usuarioId]);
  return { ok: result.affectedRows > 0, message: result.affectedRows > 0 ? 'Usuario eliminado.' : 'Usuario no encontrado.' };
}

module.exports = { getRanking, getProfile, getAdminSummary, deleteUser };
