const userController = {
    me(req,res,next){
        res.json({msg:"Me route working fine"})
    }
}

export default userController;