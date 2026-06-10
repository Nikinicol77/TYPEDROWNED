const { app } = require('./app');
const { config } = require('./config/app.config');
const { testDatabaseConnection } = require('./database/mysql.connection');
const { initializeDatabase } = require('./database/init.database');

async function startServer() {
  try {
    await testDatabaseConnection();
    await initializeDatabase();

    app.listen(config.port, () => {
      console.log(`Servidor corriendo en http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor. Revisa la conexión a MySQL.');
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
