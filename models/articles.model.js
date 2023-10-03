const db = require('../db/connection');

exports.fetchArticles = (articleId) => {
    return db.query(`
        SELECT * FROM articles
        WHERE article_id = $1
    `, [articleId])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404})
        }
        return data.rows[0];
    })
    .catch((err) =>{
        return Promise.reject(err);
        }
    )
}
