const articleRouter = require('express').Router();
const { getArticleById, getArticles, patchArticle } = require('../controllers/articles.controller.js');
const { getComments, postComments } = require('../controllers/comments.controller.js');


articleRouter
.get('/', getArticles)

articleRouter
.route('/:article_id')
.get(getArticleById)
.patch( patchArticle)

articleRouter
.route('/:article_id/comments')
.get(getComments)
.post( postComments)

module.exports = articleRouter;