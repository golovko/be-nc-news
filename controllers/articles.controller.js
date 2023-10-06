const { fetchArticleById, fetchArticles, updateArticle } = require('../models/articles.model');

exports.getArticleById = (req, res, next) => {
    const articleId = Number(req.params.article_id);
    return fetchArticleById(articleId)
    .then((article) => {
        res.status(200).send(article);
    })
    .catch((err)=>{
        next(err);
    })
}

exports.getArticles = (req, res, next) => {
    let topic = '';
    if(req.query.topic) topic = req.query.topic;
    return fetchArticles(topic)
    .then((articles) => {
        res.status(200).send({articles});
    })
    .catch((err)=>{
        next(err);
    })
}

// patch
exports.patchArticle = (req, res, next) => {
    const updatingArticle = {
        article_id: Number(req.params.article_id),
        inc_votes: req.body.inc_votes
    }
    return updateArticle(updatingArticle)
    .then((article) => {
        res.status(200).send({article});
    })
    .catch((err)=>{
        next(err);
    })
}