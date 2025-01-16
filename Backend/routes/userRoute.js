const express = require('express');
const { registerController, loginController, getAllUsers, getUserById, deleteUser } = require('../controllers/userController');
const routerUser = express.Router();

routerUser.post('/register', registerController)
routerUser.post('/login', loginController)
routerUser.get('/users', getAllUsers)
routerUser.get('/users/:id', getUserById)
routerUser.delete('/delete/users/:id', deleteUser);

module.exports = routerUser;    