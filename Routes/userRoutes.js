const express = require('express');
const Route=express.Router();
const User=require('../Model/User');
const HttpError=require('../Model/HttpError');
const auth = require('../Middleware/auth');
const loginController = require('../Controller/loginController');

Route.post('/login',auth,loginController);

module.exports = Route;