const { pool } = require('./mysql.connection');

async function columnExists(tableName, columnName) {
  const [rows] = await pool.execute(
    `SELECT COUNT(*) AS total
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = ?`,
    [tableName, columnName]
  );

  return rows[0].total > 0;
}

async function addColumnIfMissing(tableName, columnName, definition) {
  const exists = await columnExists(tableName, columnName);

  if (!exists) {
    await pool.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
}

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(150) NULL UNIQUE,
      username VARCHAR(100) NULL UNIQUE,
      password VARCHAR(255) NULL,
      password_hash VARCHAR(255) NULL,
      password_salt VARCHAR(255) NULL,
      estrellas INT NOT NULL DEFAULT 0,
      rol VARCHAR(30) NOT NULL DEFAULT 'jugador',
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await addColumnIfMissing('usuarios', 'nombre', 'VARCHAR(100) NOT NULL DEFAULT "Jugador"');
  await addColumnIfMissing('usuarios', 'correo', 'VARCHAR(150) NULL UNIQUE');
  await addColumnIfMissing('usuarios', 'username', 'VARCHAR(100) NULL UNIQUE');
  await addColumnIfMissing('usuarios', 'password', 'VARCHAR(255) NULL');
  await addColumnIfMissing('usuarios', 'password_hash', 'VARCHAR(255) NULL');
  await addColumnIfMissing('usuarios', 'password_salt', 'VARCHAR(255) NULL');
  await addColumnIfMissing('usuarios', 'estrellas', 'INT NOT NULL DEFAULT 0');
  await addColumnIfMissing('usuarios', 'rol', 'VARCHAR(30) NOT NULL DEFAULT "jugador"');
  await addColumnIfMissing('usuarios', 'fecha_creacion', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP');

  await pool.query('ALTER TABLE usuarios MODIFY correo VARCHAR(150) NULL UNIQUE').catch(() => null);
  await pool.query('ALTER TABLE usuarios MODIFY password VARCHAR(255) NULL').catch(() => null);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS partidas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      nivel INT NOT NULL,
      subnivel INT NULL,
      estrellas_obtenidas INT DEFAULT 0,
      completado BOOLEAN DEFAULT FALSE,
      wpm INT DEFAULT 0,
      precision_porcentaje INT DEFAULT 0,
      tiempo_usado INT DEFAULT 0,
      gano BOOLEAN DEFAULT FALSE,
      fecha_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await addColumnIfMissing('partidas', 'subnivel', 'INT NULL');
  await addColumnIfMissing('partidas', 'estrellas_obtenidas', 'INT DEFAULT 0');
  await addColumnIfMissing('partidas', 'completado', 'BOOLEAN DEFAULT FALSE');
  await addColumnIfMissing('partidas', 'wpm', 'INT DEFAULT 0');
  await addColumnIfMissing('partidas', 'precision_porcentaje', 'INT DEFAULT 0');
  await addColumnIfMissing('partidas', 'tiempo_usado', 'INT DEFAULT 0');
  await addColumnIfMissing('partidas', 'gano', 'BOOLEAN DEFAULT FALSE');
  await addColumnIfMissing('partidas', 'fecha_partida', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
}

module.exports = { initializeDatabase };
