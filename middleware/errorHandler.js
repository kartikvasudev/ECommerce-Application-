import { DEBUG_MODE } from "../config/index.js";
import { ValidationError } from "joi/lib/errors.js";
import ErrorHandler from "../services/ErrorHandler.js";

const errorHandler = (err,req,res,next) => {
    let statusCode = 500;
    let data = {
        message:"Internal server error",
       //Spread Syntax
        ...((DEBUG_MODE === 'true') && {originalError: err.message}) 
    }
    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    else if(err instanceof ErrorHandler)
    {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);
}

export default errorHandler;