const { reset } = require('nodemon');
const { fetchComments, existenceCheck } = require('../models/comments.model.js');

exports.getComments = (req, res, next) => {
    const articleId = req.params.article_id;

    return existenceCheck(articleId)
    .then((data) => {
        if(data.errorCode || data.code){
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