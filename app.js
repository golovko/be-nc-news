const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controller.js');
const { getEndpoints } = require('./controllers/endpoints.controller.js');
const { getArticleById, getArticles, patchArticle } = require('./controllers/articles.controller.js');
const { customErrors, psqlErrors } = require('./errors/errorHandler.js');
const { getComments, postComments } = require('./controllers/comments.controller.js');

app.use(express.json());

// endpoints
app.get('/api', getEndpoints);

// topics
app.get('/api/topics', getTopics);

// articles
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.patch('/api/articles/:article_id', patchArticle)

// comments
app.get('/api/articles/:article_id/comments', getComments);
app.post('/api/articles/:article_id/comments', postComments);

//overriding default express error for endpoints that not exist 
app.use((req, res, next) => {
    res.status(400).send("Bad request");
  })

// error handling
app.use(psqlErrors);
app.use(customErrors);

module.exports = app;