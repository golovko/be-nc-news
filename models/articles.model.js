const db = require('../db/connection');

fetchArticleById = (articleId) => {
    return db.query(`
    SELECT articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.body,
            articles.created_at,
            articles.votes,
            article_img_url,
    CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
    FROM comments 
    JOIN articles ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
        GROUP BY articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.body,
            articles.created_at,
            articles.votes,
            article_img_url
    `, [articleId])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: `Article with id ${articleId} not found`})
        }
        return data.rows[0];
    })
}
module.exports.fetchArticleById = fetchArticleById;

exports.fetchArticles = (topic) => {
    let whereClause = '';
    let values = [];
    if(topic) {
        whereClause = `WHERE articles.topic = $1`;
        values.push(topic)
    }
    return db.query(`
    SELECT articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            article_img_url,
    CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
    FROM comments 
    JOIN articles ON articles.article_id = comments.article_id
    ${whereClause}
    GROUP BY articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            article_img_url
    ORDER BY articles.created_at DESC;
    `, values)
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: 'Not found'})
        }
        return data.rows;
    })
}

exports.updateArticle = (article) => {
    if(isNaN(article.inc_votes)) {
        return Promise.reject({errorCode: 400, errorMessage: 'Invalid body'})
    }
        return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
    `, [article.inc_votes, article.article_id])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: `Article with id ${article.article_id} not found`})
        }
        return data.rows[0];
    })
}