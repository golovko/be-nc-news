const endpointRouter = require('express').Router();
const { getEndpoints } = require('../controllers/endpoints.controller.js');

endpointRouter
.get('/', getEndpoints)

module.exports = endpointRouter;