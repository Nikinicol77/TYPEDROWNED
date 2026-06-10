CREATE DATABASE IF NOT EXISTS typedrowned_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE typedrowned_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NULL UNIQUE,
  username VARCHAR(100) NULL UNIQUE,
  password VARCHAR(255) NULL,
  password_hash VARCHAR(255) NULL,
  password_salt VARCHAR(255) NULL,
  estrellas INT NOT NULL DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS partidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  nivel INT NOT NULL,
  subnivel INT NULL,
  estrellas_obtenidas INT DEFAULT 0,
  completado BOOLEAN DEFAULT FALSE,
  fecha_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Si ya tenías creada la tabla partidas sin la columna subnivel,
-- el backend la agrega automáticamente al iniciar.
-- También puedes ejecutarlo manualmente desde Workbench solo si no existe:
-- ALTER TABLE partidas ADD COLUMN subnivel INT NULL;

-- Consultas útiles:
SELECT id, nombre, username, estrellas, fecha_creacion FROM usuarios;
SELECT usuario_id, nivel, MAX(subnivel) AS ultimo_subnivel_completado
FROM partidas
WHERE completado = 1
GROUP BY usuario_id, nivel;
