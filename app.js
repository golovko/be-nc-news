const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controller.js');
const { getEndpoints } = require('./controllers/endpoints.controller.js');
const { getArticleById, getArticles } = require('./controllers/articles.controller.js');
const { customErrors, psqlErrors } = require('./errors/errorHandler.js');
const { getComments } = require('./controllers/comments.controller.js');
// endpoints
app.get('/api', getEndpoints);

// topics
app.get('/api/topics', getTopics);

// articles
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);

// comments
app.get('/api/articles/:article_id/comments', getComments);

//overriding default express error for endpoints that not exist 
app.use((req, res, next) => {
    res.status(400).send("Bad request");
  })

// error handling
app.use(psqlErrors);
app.use(customErrors);

module.exports = app;