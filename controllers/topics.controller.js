const { fetchTopics, saveTopic } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  return fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTopic = (req, res, next) => {
  return saveTopic(req.body)
    .then((newTopic) => {
      res.status(201).send(newTopic);
    })
    .catch((err) => {
      next(err);
    });
};
