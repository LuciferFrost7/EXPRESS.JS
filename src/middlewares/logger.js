module.exports  = (req, res, next) => {
    console.log(`[${req.method}] on ${req.url}`);
    next();
};