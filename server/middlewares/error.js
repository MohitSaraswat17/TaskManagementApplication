class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
    }
}

export const ErrorMiddleWare = (err, req, res, next)=>{
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;
 
    if(err.name==="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    return res.status(err.statuscode).json({
        success:false,
        message:err.message
    });
}


export default ErrorHandler;