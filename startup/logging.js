const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    //logging uncaught exceptions which arent in the express pipeline
    process.on('uncaughtException', (ex)=>{
        winston.error(ex.message, { meta: ex });
        process.exit(1);
    });

    process.on('unhandledRejection', (ex)=>{
        winston.error(ex.message, { meta: ex });
        process.exit(1);
    });

    //logging into console, logfile.log and mongodb
    winston.add(winston.createLogger({
        format: winston.format.combine(
            // winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({
                level: 'info',
                timestamp: false,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({ 
                filename: 'logfile.log'
            }),
            // new winston.transports.MongoDB({ 
            //     db: 'mongodb://localhost/vidly', 
            //     metaKey: 'meta' 
            // })
        ]
    }));
};