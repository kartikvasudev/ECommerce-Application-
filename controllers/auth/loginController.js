import Joi from "joi";
import { User,RefreshToken } from "../../models/index.js";
import { REFRESH_SECRET } from "../../config/index.js";
import ErrorHandler from "../../services/ErrorHandler.js";
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';

const loginSchema =  Joi.object(
    {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
)

const loginController = {
    async login(req,res,next){
        //1.Validate
        const {error} = loginSchema.validate(req.body);
        if(error)
        return next(error);

        //2.Check if email is in db or not
        let user;
        try {
            user = await User.findOne({ email: req.body.email});
            if(!user)
            {
                return next(ErrorHandler.wrongCredentials());
            }
        } catch (error) {
            return next(error);
        }

        //3.Compare Password
        const match = await bcrypt.compare(req.body.password,user.password);

        if(!match)
        {
            return next(ErrorHandler.wrongCredentials());
        }
        
        //4.Token 
        
        const access_token = JwtService.sign({_id: user._id,role: user.role});
        const refresh_token = JwtService.sign({_id: user._id,role: user.role},'1y',REFRESH_SECRET);
                
        //Database whitelist refresh token
        await RefreshToken.create({token:refresh_token});

        //5.Send Response
        res.json({access_token,refresh_token});
    }
};

export default loginController;

