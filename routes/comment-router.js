const commentRouter = require('express').Router();
const { deleteComment, patchComment } = require('../controllers/comments.controller.js');

commentRouter
.route('/:comment_id')
.delete(deleteComment)
.patch(patchComment)

module.exports = commentRouter;