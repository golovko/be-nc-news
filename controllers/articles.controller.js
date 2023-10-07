const { fetchArticleById, fetchArticles, updateArticle, saveArticle } = require('../models/articles.model');

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
    let topic = req.query.topic;
    let sortBy = req.query.sort_by;
    let order = req.query.order;
    return fetchArticles(topic, sortBy, order)
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

exports.postArticle = (req, res, next) => {
    const article = req.body;
    return saveArticle(article)
    .then((result) => {
        res.status(201).send(result);
    })
    .catch((err)=>{
        next(err);
    })
}