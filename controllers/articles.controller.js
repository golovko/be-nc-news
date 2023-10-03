const { fetchArticles } = require('../models/articles.model');

exports.getArticleById = (req, res, next) => {
    let articleId;

    if (isNaN(req.params.article_id)){
        next({errorCode: 400})
    } else {
        articleId = Number(req.params.article_id);
        return fetchArticles(articleId)
        .then((article) => {
            res.status(200).send(article);
        })
        .catch((err)=>{
            next(err);
        })
    }
}