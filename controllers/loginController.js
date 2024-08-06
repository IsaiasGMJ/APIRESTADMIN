const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { JWT_SECRET } = process.env;

// Controlador de registro
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validar los datos requeridos
        if (!(username && email && password)) {
            return res.status(400).send("Debes indicar el nombre de usuario, email y contraseña");
        }

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("El usuario ya existe, por favor inicia sesión con tus credenciales");
        }

        // Crear un nuevo usuario y guardarlo en la base de datos
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generar un token JWT
        const token = jwt.sign({ userId: newUser._id, email }, JWT_SECRET, { expiresIn: "10m" });

        // Retornar el nuevo usuario y el token
        return res.status(201).json({ user: newUser, token });

    } catch (err) {
        console.log("Ha ocurrido un error", err);
        res.status(500).send("Error en el servidor");
    }
};

// Controlador de login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar los datos requeridos
        if (!(email && password)) {
            return res.status(400).send("Debes indicar el email y contraseña");
        }

        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            // Retornar el usuario y el token
            return res.status(200).json({ user});
        } else {
            return res.status(403).send("Credenciales inválidas");
        }
    } catch (err) {
        console.log("Ha ocurrido un error", err);
        res.status(500).send("Error en el servidor");
    }
}

module.exports = {
    register,
    login
};
