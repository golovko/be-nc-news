const db = require('../db/connection');

exports.fetchComments = (articleId) => {
    return db.query(`
        SELECT * 
        FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC;
    `, [articleId])
    .then((data) => {
        return data.rows;
    })
    .catch((err) => {
        return err;
    })
}

exports.existenceCheck = (articleId) => {
    return db.query(`
        SELECT * FROM articles WHERE article_id = $1
    `, [articleId])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404})
        }else {
            return true;
        }
    })
    .catch((err) => {
        return err;
    })

}