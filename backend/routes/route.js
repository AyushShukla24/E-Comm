const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken')
// const {fetchUser}=require('../Authetication/auth');

//verify user ---- middleware
fetchUser=async(req,res,next)=>{
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

const {home,popularinwomen,getcart,removetocart,addtocart,newcollection,login,signup,addproduct,removeproduct,allproducts}=require('../controller/file');

router.get('/',home);
router.post('/addproduct',addproduct);
router.post('/removeproduct',removeproduct);
router.get('/allproducts',allproducts);
router.post('/signup',signup);
router.post('/login',login);
router.get('/newcollections',newcollection);
router.get('/popularinwomen',popularinwomen);
router.post('/addtocart',fetchUser,addtocart);
router.post('/removetocart',fetchUser,removetocart);
router.post('/getcart',fetchUser,getcart);

module.exports=router;