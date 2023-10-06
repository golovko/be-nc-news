const commentRouter = require('express').Router();
const { deleteComment } = require('../controllers/comments.controller.js');

commentRouter
.delete('/:comment_id', deleteComment)

module.exports = commentRouter;