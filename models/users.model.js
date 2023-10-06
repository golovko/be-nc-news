const db = require('../db/connection');

exports.fetchUsers = () => {
    return db.query(`
    SELECT *
    FROM users 
    `)
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: 'Users not found'})
        }
        return data.rows;
    })
}



exports.fetchUserByUsername = (username) => {
    return db.query(`
    SELECT *
    FROM users 
    WHERE username = $1
    `, [username])
    .then((data) => {
        if(data.rows.length === 0) {
            return Promise.reject({errorCode: 404, errorMessage: 'User not found'})
        }
        return data.rows[0];
    })
}
