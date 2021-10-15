const express = require('express');
const Route=express.Router();
const auth = require('../Middleware/auth');
const loginController = require('../Controller/loginController');

Route.post('/login',auth,loginController);

module.exports = Route;