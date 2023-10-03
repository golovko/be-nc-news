exports.customErrors = (err, req, res, next) => {
    console.log(err);
    
    // default
    let errorCode = 500;
    let errorMessage = 'Server error. Something went wrong.';
    
    // not found
    if(err.errorCode === 404) {
        errorCode = err.errorCode;
        errorMessage = 'Not found'
    }
    if(err.errorCode === 400) {
        errorCode = err.errorCode;
        errorMessage = 'Bad request'
    }

    res.status(errorCode).send({errorMessage})
    next(err)
}

exports.psqlErrors = (err, req, res, next) => {
    console.log(err);

    if(err.code === '22P02') {
        res.status(400).send({ errorMessage: 'Bad request' });
    } else {
    next (err);
    }
}