const { 
    fetchComments, 
    saveComment,
    removeComment,
    updateComment } = require('../models/comments.model.js');
const { checkExists }  = require('../utils/util.js');

exports.getComments = (req, res, next) => {
    const articleId = req.params.article_id;
    const page = req.query.p
    const limit = req.query.limit;
    return checkExists('articles', 'article_id', articleId)
    .then((data) => {
        if(!data){
            return Promise.reject(data);
        } else {        
            return fetchComments(articleId, page, limit)
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
    newComment.article_id = Number(req.params.article_id);
    return checkExists('articles', 'article_id', newComment.article_id )
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
        res.status(204).send();
    })
    .catch((err) => {
        next(err);
    })
}

exports.patchComment = (req, res, next) => {
    const comment = {
        comment_id: Number(req.params.comment_id),
        inc_votes: req.body.inc_votes
    }
    return updateComment(comment)
    .then((updatedComment) => {
        res.status(200).send({updatedComment});
    })
    .catch((err)=>{
        next(err);
    })
}