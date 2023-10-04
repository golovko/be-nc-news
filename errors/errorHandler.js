exports.customErrors = (err, req, res, next) => {
    console.log(err);
    
    // default
    let errorCode = err.errorCode || 500;
    let errorMessage = err.errorMessage || 'Server error. Something went wrong.';
    
    res.status(errorCode).send({errorMessage})
    next(err)
}

exports.psqlErrors = (err, req, res, next) => {
    if(err.code === '22P02') {
        console.log(err);
        res.status(400).send({ errorMessage: 'Bad request' });
    } else {
    next (err);
    }
}