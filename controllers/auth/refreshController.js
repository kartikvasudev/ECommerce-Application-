import Joi from "joi";
import { REFRESH_SECRET } from "../../config/index.js";
import { RefreshToken,User } from "../../models/index.js";
import ErrorHandler from "../../services/ErrorHandler.js";
import JwtService from "../../services/JwtService.js";

const refreshSchema =  Joi.object(
    {
        refresh_token: Joi.string().required()
    }
)

const refreshController = {
    async refresh(req,res,next){
        const {error} = refreshSchema.validate(req.body);
        if(error)
        {
            return next(error);
        }
        //Check DB if refresh token is there(Meaning if its there or user is logged out)
        let refresh_token;
        try {
            refresh_token =  await RefreshToken.findOne({token:req.body.refresh_token});
            if(!refresh_token)
            {
                return next(ErrorHandler.unauthorized('Invalid Refresh Token'));
            }
        } catch (error) {
            next(new Error("Something went wrong"+error.message));
        }
        let userId;
        try {
            const {_id} = await JwtService.verify(refresh_token.token,REFRESH_SECRET);
            userId = _id;
        } catch (error) {
            next(new Error("Something went wrong"+error.message));
        }

        //Check if user is in db

        const user = User.findOne({_id:userId});
        if(!user)
        {
            next(ErrorHandler.unauthorized("No user found"));
        }

        //generate tokens

        const access_token = JwtService.sign({_id: user._id,role: user.role});
        const refreshToken = JwtService.sign({_id: user._id,role: user.role},'1y',REFRESH_SECRET);
                
        //Database whitelist refresh token
        await RefreshToken.create({token:refreshToken});

        //5.Send Response
        res.json({access_token,
            refresh_token: refreshToken});

    }
};

export  {refreshController,refreshSchema};