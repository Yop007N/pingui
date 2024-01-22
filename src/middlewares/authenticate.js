// En un archivo llamado authenticate.js dentro de tu directorio de controllers o middlewares.

const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
  // Obtener el token del header de la solicitud
  const token = req.header('Authorization')?.split(' ')[1]; // Espera un header "Authorization: Bearer <token>"

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Añadir usuario al objeto request
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticate;
