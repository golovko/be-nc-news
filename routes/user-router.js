const userRouter = require('express').Router();
const { getUsers } = require('../controllers/users.controller.js');

userRouter
.get('/', getUsers)

module.exports = userRouter;