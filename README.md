# TypeQuest — Videojuego web de mecanografía con identidad UNAC

*TypeQuest* es un videojuego web educativo de mecanografía diseñado para la comunidad universitaria de la Corporación Universitaria Adventista (UNAC). El proyecto permite practicar velocidad, precisión, concentración y constancia a través de mundos progresivos, niveles especiales con audio/coros adventistas y un sistema de progreso persistente conectado a MySQL.

La aplicación está organizada en dos partes principales:

```txt
TypeQuest/
├── Frontend/   # Aplicación React + Vite + Phaser
└── Backend/    # API Node.js + Express + MySQL
```

---

## 1. Descripción general

TypeQuest combina mecánicas de mecanografía con una ruta formativa inspirada en valores cristianos adventistas e identidad institucional. El jugador puede entrar como invitado, registrarse, iniciar sesión, avanzar por mundos, desbloquear subniveles y consultar su progreso desde diferentes dispositivos.

El juego se estructura en tres mundos:

| Mundo | Nombre | Tipo de texto | Dificultad |
|---|---|---|---|
| Nivel 1 | Transformar el carácter | Cuento | Frases sencillas, pocos signos de puntuación |
| Nivel 2 | Innovar con propósito | Técnico | Mayor dificultad, más vocabulario y puntuación |
| Nivel 3 | Servir con esperanza | Tesis | Palabras complejas y mayor uso de signos |

Los subniveles 10 y 20 de cada mundo están preparados como niveles especiales con audio/coros adventistas y scroll automático.

---

## 2. Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Phaser
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express
- MySQL
- CORS
- dotenv
- bcryptjs

### Despliegue

- Frontend: Vercel
- Backend: Railway
- Base de datos: Railway MySQL
- Repositorio: GitHub

---

## 3. Enlaces del proyecto

| Recurso | Enlace |
|---|---|
| Aplicación publicada | https://typedrowned.vercel.app |
| Backend API | https://typedrowned-production.up.railway.app/api |
| Repositorio | https://github.com/Nikinicol77/TYPEDROWNED |

---

## 4. Estructura del proyecto

```txt
TypeQuest/
├── Frontend/
│   ├── public/
│   │   └── game/
│   │       ├── audio/
│   │       ├── scripts/
│   │       │   ├── nivel1.js
│   │       │   ├── nivel2.js
│   │       │   └── nivel3.js
│   │       └── styles/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── router/
│   │   └── shared/
│   ├── index.html
│   ├── package.json
│   └── vercel.json
│
├── Backend/
│   ├── database/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 5. Funcionalidades principales del PMV

1. Manejo de sesión.
2. Registrar usuario.
3. Manejo de mundos.
4. Acceder a niveles.
5. Desbloquear niveles.
6. Cambiar ambiente según mundo.
7. Jugar nivel.
8. Cargar niveles especiales.
9. Ranking e historial de estadísticas.
10. Muñeco, avance y sistema de vidas.

---

## 6. Modo invitado

TypeQuest permite jugar sin iniciar sesión. En este modo, el progreso se guarda de forma local en el navegador. Si el jugador posteriormente inicia sesión o crea una cuenta, el sistema puede sincronizar el avance realizado como invitado con el usuario autenticado.

Esto permite que cualquier persona pruebe el juego sin registrarse, pero también conserva la opción de guardar su progreso real en MySQL al iniciar sesión.

---

## 7. Base de datos MySQL

La base de datos principal se llama:

```sql
typedrowned_db
```

Tablas principales:

```txt
usuarios
partidas
```

La tabla `usuarios` almacena la información de los jugadores registrados.

La tabla `partidas` almacena el progreso, estadísticas y resultados de cada subnivel completado.

### Consulta para ver usuarios

```sql
SELECT id, nombre, username, correo, rol, estrellas, fecha_creacion
FROM usuarios;
```

### Consulta para ver progreso

```sql
SELECT 
  usuario_id,
  nivel,
  subnivel,
  wpm,
  precision_valor,
  tiempo_usado,
  completado,
  fecha_partida
FROM partidas
ORDER BY fecha_partida DESC;
```

### Consulta de progreso resumido

```sql
SELECT 
  u.id,
  u.nombre,
  p.nivel,
  MAX(p.subnivel) AS ultimo_subnivel_completado,
  LEAST(MAX(p.subnivel) + 1, 20) AS subnivel_maximo_desbloqueado
FROM usuarios u
LEFT JOIN partidas p ON p.usuario_id = u.id AND p.completado = 1
GROUP BY u.id, u.nombre, p.nivel
ORDER BY u.id, p.nivel;
```

---

## 8. Instalación local

### 8.1. Clonar repositorio

```bash
git clone https://github.com/Nikinicol77/TYPEDROWNED.git
cd TYPEDROWNED
```

### 8.2. Instalar Frontend

```bash
cd Frontend
npm install
npm run dev
```

El frontend se ejecuta normalmente en:

```txt
http://localhost:5173
```

### 8.3. Instalar Backend

```bash
cd Backend
npm install
npm run dev
```

El backend se ejecuta normalmente en:

```txt
http://localhost:3000
```

---

## 9. Variables de entorno

### Backend

Crear un archivo `.env` dentro de la carpeta `Backend`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=typedrowned_db
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA_MYSQL
FRONTEND_URL=http://localhost:5173
```

Para producción en Railway, las variables se configuran desde el panel del servicio Backend:

```env
PORT=3000
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
FRONTEND_URL=https://typedrowned.vercel.app
```

### Frontend

Crear un archivo `.env` dentro de la carpeta `Frontend`:

```env
VITE_API_URL=http://localhost:3000/api
```

Para producción en Vercel:

```env
VITE_API_URL=https://typedrowned-production.up.railway.app/api
```

---

## 10. Rutas principales del Frontend

```txt
/                 Pantalla pública principal
/login            Inicio de sesión
/registro         Registro de usuario
/menu             Menú principal de mundos
/nivel/1          Mundo 1 - Transformar el carácter
/nivel/2          Mundo 2 - Innovar con propósito
/nivel/3          Mundo 3 - Servir con esperanza
/ranking          Ranking general
/perfil           Perfil del jugador
/admin            Panel administrador
/recuperar        Recuperación de contraseña
/identidad-unac   Identidad institucional
```

---

## 11. Rutas principales del Backend

```txt
GET  /api
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/usuarios
POST /api/auth/recover

GET  /api/jugadores
GET  /api/jugadores/:id
POST /api/jugadores

GET  /api/progreso/:usuarioId
GET  /api/progreso/:usuarioId/nivel/:nivel
PUT  /api/progreso
POST /api/progreso

GET    /api/dashboard/ranking
GET    /api/dashboard/perfil/:usuarioId
GET    /api/dashboard/admin
DELETE /api/dashboard/admin/usuarios/:usuarioId
```

---

## 12. Mecánica del juego

Durante cada partida, el sistema muestra un texto objetivo que el jugador debe escribir exactamente como aparece. El temporizador inicia cuando el jugador escribe el primer carácter.

El juego mide:

- WPM.
- Precisión.
- Tiempo usado.
- Letras correctas.
- Resultado de la partida.
- Progreso del subnivel.
- Vidas restantes.

El muñeco avanza de izquierda a derecha según el porcentaje de texto escrito. Cada error puede descontar una vida. Si el jugador pierde todas las vidas, el intento termina como fallido.

---

## 13. Niveles especiales

Los subniveles 10 y 20 de cada mundo están preparados para canciones o coros adventistas. Estos niveles cargan audio, texto largo y scroll automático.

Variables de canciones:

```txt
Nivel 1: song_n1_10, song_n1_20
Nivel 2: song_n2_10, song_n2_20
Nivel 3: song_n3_10, song_n3_20
```

Ubicación de audios:

```txt
Frontend/public/game/audio/
```

Ubicación de scripts:

```txt
Frontend/public/game/scripts/
```

---

## 14. Ranking, perfil y estadísticas

El sistema incluye ranking general y perfil del jugador. Estas pantallas consultan MySQL mediante el backend para mostrar:

- Jugador.
- Subniveles completados.
- Estrellas.
- Mejor WPM.
- Mejor precisión.
- Historial de partidas.
- Insignias de valores.

---

## 15. Panel administrador

El sistema incluye un panel de administración para consultar usuarios, partidas y datos generales. Para acceder al panel se puede crear un usuario llamado `admin`; el sistema puede asignar automáticamente el rol de administrador.

Ruta:

```txt
/admin
```

---

## 16. Identidad UNAC

TypeQuest adapta la experiencia de mecanografía a una ruta formativa inspirada en valores cristianos adventistas y formación integral.

Los mundos representan:

- Transformar el carácter.
- Innovar con propósito.
- Servir con esperanza.

La pantalla de identidad institucional se encuentra en:

```txt
/identidad-unac
```

---

## 17. Despliegue

### Frontend en Vercel

El frontend se despliega desde la carpeta `Frontend`.

Configuración:

```txt
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Variable:

```env
VITE_API_URL=https://typedrowned-production.up.railway.app/api
```

Para evitar errores 404 al recargar rutas internas, el archivo `Frontend/vercel.json` debe contener:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend en Railway

El backend se despliega desde la carpeta `Backend`.

Comandos:

```txt
Install Command: npm install
Start Command: npm start
```

Variables principales:

```env
PORT=3000
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
FRONTEND_URL=https://typedrowned.vercel.app
```

---

## 18. Solución de errores comunes

| Problema | Causa probable | Solución |
|---|---|---|
| `npm start` no funciona en frontend | El frontend usa Vite | Usar `npm run dev` |
| `Access denied for user root@localhost` | Falta contraseña en `.env` | Crear o corregir `Backend/.env` |
| `vite no se reconoce` | `npm install` falló | Borrar `node_modules`, limpiar caché y reinstalar |
| 404 al abrir `/menu` en Vercel | Falta rewrite de rutas internas | Verificar `vercel.json` |
| No guarda progreso | Backend o MySQL desconectado | Verificar Railway y `VITE_API_URL` |
| Cambios no aparecen en Vercel | No se guardó, no se hizo commit o no hubo deploy | Revisar `git status`, commit, push y deploy |
| El progreso no aparece en otro navegador | No se inició sesión o no se sincronizó con MySQL | Iniciar sesión con el usuario correcto |

---

## 19. Comandos Git frecuentes

```bash
git status
git add .
git commit -m "Mensaje del cambio"
git push origin main
```

---

## 20. Estado actual del proyecto

El proyecto cuenta con:

- Frontend publicado.
- Backend publicado.
- Base de datos MySQL en la nube.
- Registro e inicio de sesión conectados a MySQL.
- Modo invitado.
- Sincronización de progreso.
- Ranking e historial.
- Perfil del jugador.
- Panel administrador.
- Identidad UNAC.
- Mecánica de juego con WPM, precisión, muñeco, avance y vidas.
- Niveles especiales listos para coros adventistas.

---

## 21. Autores

Proyecto académico desarrollado para Programación Web.

*Repositorio:* https://github.com/Nikinicol77/TYPEDROWNED

