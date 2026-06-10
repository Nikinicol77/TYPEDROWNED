function notFoundHandler(_req, res) {
  res.status(404).json({ message: 'Ruta no encontrada' });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = { notFoundHandler, errorHandler };
