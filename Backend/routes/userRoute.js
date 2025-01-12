const express = require('express');
const { registerController, loginController } = require('../controllers/userController');
const routerUser = express.Router();

routerUser.post('/register', registerController)
routerUser.post('/login', loginController)
module.exports = routerUser;    