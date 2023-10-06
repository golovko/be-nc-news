const topicRouter = require('express').Router();
const { getTopics } = require('../controllers/topics.controller.js');

topicRouter
.get('/', getTopics)

module.exports = topicRouter;