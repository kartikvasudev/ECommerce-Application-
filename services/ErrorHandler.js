class ErrorHandler extends Error{
    constructor(status,msg){
        super()
        this.status=status;
        this.message=msg;
    }

    static alreadyExists(message){
        return new ErrorHandler(409,message);
    }

    static wrongCredentials(message = "Username or Password is wrong"){
        return new ErrorHandler(401,message);
    }

    static unauthorized(message = "Unauthorized"){
        return new ErrorHandler(401,message);
    }

    static notFound(message = "404 Not Found"){
        return new ErrorHandler(404,message);
    }
}

export default ErrorHandler;