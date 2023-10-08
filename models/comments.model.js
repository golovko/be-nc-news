const db = require('../db/connection');
const {checkExists} = require('../utils/util');

exports.fetchComments = (articleId, page, limit) => {
    const values = [];
    values[0] = articleId;
    let limitValue = Number(limit) || 10;
    let pageNum = Number(page) > 0 ? (Number(page) - 1) * limit : 0;
    let limitPaging = `LIMIT $2 OFFSET $3`;
    values[1] = limitValue;
    values[2] = pageNum;
    return db.query(`
        SELECT * 
        FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC
        ${limitPaging}
    `, values)
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

//updateComment
exports.updateComment = (comment) => {
    if(isNaN(comment.inc_votes)) {
        return Promise.reject({errorCode: 400, errorMessage: 'Invalid body'})
    }
        return db.query(`
        UPDATE comments
        SET votes = votes + $1
        WHERE comment_id = $2
        RETURNING *;
    `, [comment.inc_votes, comment.comment_id])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: `Comment with id ${comment.comment_id} not found`})
        }
        return data.rows[0];
    })
}