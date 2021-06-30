const winston = require('winston');

module.exports = function(err,req,res,next){
    //log the exception
    // winston.log('error',err.message);
    winston.error(err.message, { meta: err });
    //first argument is logging level, eg error,warn,info,verbose,debug,silly
    
    res.status(500).send('Something failed.');
}