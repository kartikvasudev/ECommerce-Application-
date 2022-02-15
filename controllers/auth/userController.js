import { User } from "../../models/index.js";

const userController = {
    async me(req,res,next){
        try {
            //Intercept request using middleware that will check authorization header and verify
            //access token and give us the id
            const user = await User.findOne({_id:req.user._id}).select('-password -updatedAt -__v')
            if(!user)
            {
                next(ErrorHandler.notFound());
            }
            res.json({user})
        } catch (error) {
            return next(error);
        }   
    }
}

export default userController;