const crypto = require('crypto');
let bcrypt = null;
try {
  bcrypt = require('bcryptjs');
} catch (_error) {
  bcrypt = null;
}
const { pool } = require('../database/mysql.connection');

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase();
}

function validateCredentials({ username, password }) {
  const cleanUsername = String(username || '').trim();
  const cleanPassword = String(password || '');

  if (!cleanUsername || !cleanPassword) {
    return { ok: false, message: 'Completa todos los campos.' };
  }

  if (cleanUsername.length < 3) {
    return { ok: false, message: 'El usuario debe tener al menos 3 caracteres.' };
  }

  if (cleanPassword.length < 4) {
    return { ok: false, message: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  return { ok: true, username: cleanUsername, password: cleanPassword };
}

function createLegacyPasswordHash(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

async function createPasswordHash(password) {
  if (bcrypt) {
    return { hash: await bcrypt.hash(password, 10), salt: null };
  }

  return createLegacyPasswordHash(password);
}

async function isPasswordValid(password, user) {
  if (user.password_hash) {
    if (String(user.password_hash).startsWith('$2') && bcrypt) {
      return bcrypt.compare(password, user.password_hash);
    }

    if (user.password_salt) {
      const { hash } = createLegacyPasswordHash(password, user.password_salt);
      return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(user.password_hash));
    }
  }

  return user.password === password;
}

function inferRole(row) {
  if (row.rol) return row.rol;
  const username = String(row.username || row.nombre || '').toLowerCase();
  return username === 'admin' ? 'admin' : 'jugador';
}

function mapUser(row) {
  return {
    id: row.id,
    username: row.username || row.nombre,
    nombre: row.nombre,
    correo: row.correo,
    estrellas: row.estrellas || 0,
    rol: inferRole(row),
    createdAt: row.fecha_creacion,
  };
}

async function getPublicUsers() {
  const [rows] = await pool.execute(
    `SELECT id, nombre, username, correo, estrellas, rol, fecha_creacion
     FROM usuarios
     ORDER BY fecha_creacion DESC`
  );

  return rows.map(mapUser);
}

async function register(payload) {
  const validation = validateCredentials(payload);
  if (!validation.ok) return validation;

  const username = validation.username;
  const normalizedUsername = normalizeUsername(username);
  const password = validation.password;

  const [existingUsers] = await pool.execute(
    `SELECT id FROM usuarios
     WHERE LOWER(username) = ? OR LOWER(nombre) = ?
     LIMIT 1`,
    [normalizedUsername, normalizedUsername]
  );

  if (existingUsers.length > 0) {
    return { ok: false, message: 'Ese nombre de usuario ya está registrado.' };
  }

  const { hash, salt } = await createPasswordHash(password);
  const syntheticEmail = `${normalizedUsername}@typequest.local`;
  const rol = normalizedUsername === 'admin' ? 'admin' : 'jugador';

  const [result] = await pool.execute(
    `INSERT INTO usuarios (nombre, correo, username, password, password_hash, password_salt, estrellas, rol)
     VALUES (?, ?, ?, NULL, ?, ?, 0, ?)`,
    [username, syntheticEmail, username, hash, salt, rol]
  );

  return {
    ok: true,
    message: '¡Registro exitoso! Ahora puedes iniciar sesión.',
    user: {
      id: result.insertId,
      username,
      nombre: username,
      correo: syntheticEmail,
      estrellas: 0,
      rol,
    },
  };
}

async function login(payload) {
  const username = String(payload.username || '').trim();
  const password = String(payload.password || '');

  if (!username || !password) {
    return { ok: false, message: 'Completa todos los campos.' };
  }

  const normalizedUsername = normalizeUsername(username);

  const [users] = await pool.execute(
    `SELECT id, nombre, username, correo, password, password_hash, password_salt, estrellas, rol, fecha_creacion
     FROM usuarios
     WHERE LOWER(username) = ? OR LOWER(nombre) = ? OR LOWER(correo) = ?
     LIMIT 1`,
    [normalizedUsername, normalizedUsername, normalizedUsername]
  );

  const user = users[0];

  if (!user || !(await isPasswordValid(password, user))) {
    return { ok: false, message: 'Usuario o contraseña incorrectos.' };
  }

  const sessionUser = mapUser(user);

  return {
    ok: true,
    message: `¡Bienvenido, ${sessionUser.username}!`,
    user: sessionUser,
  };
}

async function recoverPassword(payload) {
  const username = String(payload.username || '').trim();
  const newPassword = String(payload.newPassword || payload.password || '').trim();

  if (!username || !newPassword) {
    return { ok: false, message: 'Escribe el usuario y la nueva contraseña.' };
  }

  if (newPassword.length < 4) {
    return { ok: false, message: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  const normalizedUsername = normalizeUsername(username);
  const { hash, salt } = await createPasswordHash(newPassword);

  const [result] = await pool.execute(
    `UPDATE usuarios
     SET password = NULL, password_hash = ?, password_salt = ?
     WHERE LOWER(username) = ? OR LOWER(nombre) = ? OR LOWER(correo) = ?`,
    [hash, salt, normalizedUsername, normalizedUsername, normalizedUsername]
  );

  if (result.affectedRows === 0) {
    return { ok: false, message: 'No encontramos ese usuario.' };
  }

  return { ok: true, message: 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.' };
}

module.exports = { getPublicUsers, register, login, recoverPassword };
