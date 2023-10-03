const { fetchArticleById, fetchArticles } = require('../models/articles.model');

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
    return fetchArticles()
    .then((articles) => {
        res.status(200).send({articles});
    })
    .catch((err)=>{
        next(err);
    })
}