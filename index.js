const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const UserRoutes = require('./routes/Users');
// const server = http.createServer(app);

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear la aplicación Express
const app = express();

// Configura la carpeta pública para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Usar las rutas definidas en routes.js
app.use(routes, UserRoutes);

// Definir el puerto
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads');  // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Configurar carpeta pública
  app.use('/public', express.static(path.join(__dirname, 'public')));