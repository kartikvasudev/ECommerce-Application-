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
}

export default ErrorHandler;