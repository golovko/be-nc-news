const userRouter = require('express').Router();
const { getUsers, getUserByUsername } = require('../controllers/users.controller.js');

userRouter
.get('/', getUsers)
.get('/:username', getUserByUsername)
module.exports = userRouter;