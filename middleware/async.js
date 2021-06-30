module.exports = function (handler){
    return async (req,res,next) => {
        try{
            await handler(req,res);
        }
        catch(ex){
            //passing the control to the error middleware in the pipeline
            next(ex);
        } 
    };  
}