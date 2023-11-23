const express = require('express');
const userRouter = express();
const path = require('path');
const userController = require('../controllers/userController');

userRouter.set('view engine', 'ejs');
userRouter.set('views', path.join(__dirname, '..', 'views', 'users'));

userRouter.use(express.static(path.join(__dirname, '..', 'public')));

userRouter.get('/', userController.loadHome);

module.exports = userRouter;
