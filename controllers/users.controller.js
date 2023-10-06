const { fetchUsers, fetchUserByUsername } = require('../models/users.model.js');

exports.getUsers = (req, res, next) => {
    return fetchUsers()
    .then((users) => {
        res.status(200).send({users});
    })
    .catch((err)=>{
        next(err);
    })
}

exports.getUserByUsername = (req, res, next) => {
    const username = req.params.username;
    return fetchUserByUsername(username)
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err)=>{
        next(err);
    })
}

