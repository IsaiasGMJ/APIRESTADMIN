const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const UserRoutes = require('./routes/Users');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear la aplicación Express
const app = express();
/*const PUERTO = 3020;
//Server https
https.createServer({
  cert: fs.readFileSync('server.cer'),
  key: fs.readFileSync('server.key'
  )} ,app).listen(PUERTO, function(){
  console.log(`Servidor escuchando en puerto ${PUERTO}`);
});*/
//permiso cors
app.use(cors());

const courseImage = path.join(__dirname, 'public', 'images', 'courses');
if (!fs.existsSync(courseImage)) {
    fs.mkdirSync(courseImage, { recursive: true });
}

// app.use('/foto',express.static(__dirname + 'almacen/img'));

// Middleware para parsear JSON en las solicitudes
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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
  // Configurar carpeta pública
  app.use('/public', express.static(path.join(__dirname, 'public')));

  