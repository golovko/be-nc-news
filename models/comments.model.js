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
    const comment = {
        author: newComment.username, 
        body: newComment.body, 
        votes: 0,
        article_id: newComment.article_id
    }
    const commentValues = Object.values(comment);
    return db.query(`
        INSERT INTO comments(author, body, votes, article_id) 
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, commentValues)
    .then((data) => {
            return data.rows[0];
    })
}