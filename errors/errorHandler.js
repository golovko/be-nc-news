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
        err = {errorCode: 400, errorMessage: 'Bad request'};
    } else if(err.code === '23503'){
        console.log(err);
        err = { errorCode: 404, errorMessage: 'Not found' };        
    }
    next(err);
}