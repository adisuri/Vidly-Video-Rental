//this middleware is assumed to be happening after authorisation middleware
module.exports = function(req, res, next){
    //auth middleware has already set req.user

    //403 is status for Forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access denied.');

    //if user is admin then pass control to next middleware function which is the route handler
    next();
}