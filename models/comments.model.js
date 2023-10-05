const db = require('../db/connection');
const {checkExists} = require('../utils/util');

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
}

exports.saveComment = (newComment) => {
    if(!newComment.body || !newComment.username) {
        return Promise.reject({errorCode: 400, errorMessage: 'Bad request. No username or body properties'})
    }
    const comment = {
        author: newComment.username, 
        body: newComment.body, 
        article_id: newComment.article_id
    }
    const commentValues = Object.values(comment);
    return db.query(`
        INSERT INTO comments(author, body, article_id) 
        VALUES ($1, $2, $3)
        RETURNING *
        `, commentValues)
    .then((data) => {
        //console.log(data);
            return data.rows[0];
    })
}

exports.removeComment = (commentId) => {
    return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1;
    `, [commentId])
    .then((data) => {
        if(data.rowCount > 0) return true;
        else return Promise.reject({errorCode: 404, errorMessage: "Comment not found"})
    })
}