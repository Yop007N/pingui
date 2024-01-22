const express = require('express');
const { register, login } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate'); // Asegúrate de que esta es la ruta correcta
const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Ruta protegida
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: "Esta es una ruta protegida" });
});

module.exports = router;
