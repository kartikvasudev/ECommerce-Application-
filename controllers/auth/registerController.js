import Joi from "joi";
import ErrorHandler from "../../services/ErrorHandler.js";
import { User } from "../../models/index.js";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService.js";

const registerSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeat_password: Joi.ref('password')
    }
);



const registerController = {
    async register(req,res,next){
        // 1.validate the request
        const {error} = registerSchema.validate(req.body);
        // 2.authorize the request
        if(error)
        {
            return next(error);
        }
            // 3.check if user is in db already
            try {
                const exist = await User.exists({email: req.body.email})
                if(exist)
                return next(ErrorHandler.alreadyExists('This email is already taken'));
            } catch (error) {
                return next(error);
            }

            const {name,email,password} = req.body; //Destructuring Object JS

            //Hash Password
            const hashedPwd = await bcrypt.hash(password,10);
            // 4.prepare model 
             
            const user = new User({name,
                email,
                password: hashedPwd })
            //When key value are same then do like this

            // 5.Store in db
            let access_token;
            try {
                const result = await user.save();
                console.log(result);
                access_token = JwtService.sign({_id: result._id,role: result.role});
                // 5.generate jwt token
            } catch (error) {
                return next(error);
            }
            
            // 6.generate response
            res.json({accesstoken: access_token});
    },
};

export default registerController;

