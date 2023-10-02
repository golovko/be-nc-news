const errorHandler = (err, req, res, next) => {
    console.log(err);
    
    const errorCode = 500;
    const errorMessage = 'Server error. Something went wrong.';

    //TODO: logic for building custom errors

    res.status(errorCode).send({errorMessage})
    next(err)
}

module.exports = errorHandler;