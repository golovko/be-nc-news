const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api-router');
const { customErrors, psqlErrors } = require('./errors/errorHandler.js');
const app = express();

app.use(cors());
app.use(express.json());

// using express Router()
app.use('/api', apiRouter);

// overriding default express error for endpoints that not exist
app.use((req, res, next) => {
  res.status(400).send('Bad request');
});

// error handling
app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
