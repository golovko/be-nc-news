const topicRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topics.controller.js');

topicRouter
.get('/', getTopics)
.post('/', postTopic)

module.exports = topicRouter;