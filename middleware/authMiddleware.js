// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para autenticación
exports.authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Almacenar los datos decodificados en req.user
        next(); // Pasar al siguiente middleware/controlador
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// middleware/authMiddleware.js
exports.adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};


