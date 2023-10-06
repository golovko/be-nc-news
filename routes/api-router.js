const apiRouter = require('express').Router();
const endpointRouter = require('./endpoint-router');
const articleRouter = require('./article-router');
const topicRouter = require('./topic-router');
const commentRouter = require('./comment-router');
const userRouter = require('./user-router');

apiRouter.use('/', endpointRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/topics', topicRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;