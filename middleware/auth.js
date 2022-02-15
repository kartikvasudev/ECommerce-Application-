import ErrorHandler from "../services/ErrorHandler.js";
import JwtService from "../services/JwtService.js";

const auth = async (req,res,next) => {
    //Extract token from header
    let authHeader = req.headers.authorization;
    if(!authHeader)
    {
        return next(ErrorHandler.unauthorized());
    }
    const token = authHeader.split(' ')[1];

    //Verify Token
    try {
        const {_id,role} = await JwtService.verify(token);
        req.user =  {};
        req.user._id = _id;
        req.user.role = role;
        next();
    } catch (error) {
        return next(ErrorHandler.unauthorized());
    }
}

export default auth;