const db = require('../db/connection');

exports.fetchArticleById = (articleId) => {
    return db.query(`
        SELECT * FROM articles
        WHERE article_id = $1
    `, [articleId])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: `Article with id ${articleId} not found`})
        }
        return data.rows[0];
    })
}

exports.fetchArticles = () => {
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
    GROUP BY articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            article_img_url
    ORDER BY articles.created_at DESC;
    `)
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404})
        }
        return data.rows;
    })
}