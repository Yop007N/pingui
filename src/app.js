require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); // Importa la instancia de sequelize
const userRoutes = require('./routes/index'); // Ajusta según tu estructura de carpetas

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

// Middleware de manejo de errores mejorado
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Manejo de errores de Sequelize
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => e.message);
    return res.status(400).json({ errors });
  }

  // Error por defecto
  res.status(500).json({ message: "Internal Server Error" });
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
