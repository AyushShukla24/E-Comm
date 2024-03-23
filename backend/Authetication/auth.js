//verify user ---- middleware
exports.fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({
            success:false,
            message:"PLease authicate using vaild user 1"
        })
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error){
            res.status(401).send({
                message:"PLease authicate using vaild user 2"
            })
        }
    }
}