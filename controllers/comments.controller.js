const { 
    fetchComments, 
    saveComment,
    removeComment } = require('../models/comments.model.js');
const { checkExists }  = require('../utils/util.js');

exports.getComments = (req, res, next) => {
    const articleId = req.params.article_id;

    return checkExists('articles', 'article_id', articleId)
    .then((data) => {
        if(!data){
            return Promise.reject(data);
        } else {        
            return fetchComments(articleId)
        }
    })
    .then((comments) => {
        res.status(200).send({comments});
    })
    .catch((err)=>{
        next(err);
    })
}

exports.postComments = (req, res, next) => {
    const newComment = req.body;
    if(!newComment.body || !newComment.username) {
        next({errorCode: 400, errorMessage: 'Bad request. No username or body properties'})
    }
    newComment.article_id = Number(req.params.article_id);
    const promises = [
        checkExists('articles', 'article_id', newComment.article_id ),
        checkExists('users', 'username', newComment.username ) ]
    
        return Promise.all(promises)
    .then((result) => {
        return saveComment(newComment)
    })
    .then((result) => {
        res.status(201).send(result);
    })
    .catch((err)=>{
        next(err);
    })
}

exports.deleteComment = (req, res, next) => {
    return removeComment(req.params.comment_id)
    .then(() =>{
        res.status(204).send({message: 'Deleted'});
    })
    .catch((err) => {
        next(err);
    })
}