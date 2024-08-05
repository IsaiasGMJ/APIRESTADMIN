const express = require('express');
const Router = express.Router();
const auth = require('../middleware/auth');
const controller = require("../controllers/loginController");
const dotenv = require('dotenv');
const router = require('./routes');
dotenv.config();

// if(procces.env.NODE_ENV !== "production"){
//     require('dotenv/config');
// }

const {JWT_SECRET} = process.env;
  
const UserRoutes = (app) => {
router.post('/login', (req, res) =>{
        return controller.login(req,res);
    });

router.post('/register', (req, res) =>{
    return controller.register(req,res);
});

router.post('/welcome', auth, (req, res) => {
    res.status(200).send("bienvenido a la api de Express Admin");
});

}

module.exports = UserRoutes;
