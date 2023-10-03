const db = require('../db/connection');

exports.fetchArticles = (articleId) => {
    let whereId = '';
    const values = [];
    if(articleId){
        whereId = ` WHERE article_id = $1`;
        values.push(articleId);
    }
    return db.query(`
        SELECT * FROM articles
        ${whereId}
    `, values)
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
