module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID invalido' });
  }

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Error de validacion', details });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Registro duplicado' });
  }

  return res.status(500).json({ message: 'Server error' });
};
