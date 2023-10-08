const articleRouter = require('express').Router();
const { getArticleById, getArticles, patchArticle, postArticle, deleteArticle } = require('../controllers/articles.controller.js');
const { getComments, postComments } = require('../controllers/comments.controller.js');


articleRouter
.route('/')
.get(getArticles)
.post(postArticle)

articleRouter
.route('/:article_id')
.get(getArticleById)
.patch(patchArticle)
.delete(deleteArticle)

articleRouter
.route('/:article_id/comments')
.get(getComments)
.post( postComments)

module.exports = articleRouter;