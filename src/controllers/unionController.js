exports.methodIsNotBelieve = (req, res, next) => {
    const error = new Error("Error 501 - Method is not believe!");
    error.status = 501;
    next(error);
}