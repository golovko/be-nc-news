const express = require('express');
const app = express();
const {getTopics} = require('./controllers/topics.controller.js');
const errorHandler = require('./errors/errorHandler.js');

// endpoints
// topics
app.get('/api/topics', getTopics);


//overriding default express error for endpoints that not exist 
app.use((req, res, next) => {
    res.status(400).send("Bad request")
  })

// error handling
app.use(errorHandler);

module.exports = app;