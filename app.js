const express = require('express');
const app = express();
const {getTopics} = require('./controllers/topics.controller.js');
const errorHandler = require('./errors/errorHandler.js');
// endpoints
// topics
app.get('/api/topics', getTopics);

// error handling
app.use((err, req, res, next) => {
    res.status(500).send({message: 'Server error. Something went wrong.'});
    next();

})

module.exports = app;