const Product=require("../model/Product");
const User=require('../model/User')
const jwt=require('jsonwebtoken')

exports.home=(req,res)=>{
    try{
        res.send("Express App is Running");
    }
    catch(error){
        res.send(error);
    }
}

exports.addproduct=async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product = last_product_array[0];
        id=last_product.id+1;
    }
    else {
        id = 1; // If there are no products, start id from 1
    }
    try{
        const {name,image,category,new_price,old_price}=req.body;
        const product=await Product.create({
            id,name,image,category,new_price,old_price
        });
    
        res.status(201).json({
            success: true,
            name: req.body.name
        });
    }
    catch(error){
        console.error("Error at addproduct", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

exports.removeproduct=async(req,res)=>{
    try{
        await Product.findOneAndDelete({id:req.body.id});
        res.status(201).json({
            success: true,
            name: req.body.name
        });
        }
    catch(error){
        console.error("Error at removeproduct", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

exports.allproducts=async(req,res)=>{
    try{
        const products=await Product.find({});
        res.send(products);
    }
    catch(error){
       res.send("error while fetching all products",error);
       
    }
}

exports.signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        let check=await User.findOne({email:email});
        if(check){
            return res.status(400).json({
                success:false,
                message:"existing email found try with new email"
            });
        }

        let cart={}
        for(let i=0;i<300;i++){
            cart[i]=0;
        }

        const addUser =await User.create({
            name,email,password,cartData:cart
        });

        const data={
            user:{
                id:User.id
            }
        }

        const token=jwt.sign(data,'secret_ecom');
        res.json({
            success:true,
            token:token
        });
    }
    catch(error){
        console.error("Error at signup", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


exports.login=async(req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email:email});
    if(user){
        const passCompare=password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom')
            res.json({
                success:true,
                token:token
            })
        }
        else{
            res.json({
                success:false,
                message:"incorrect password"
            })
        }
    }
    else{
        res.json({
            success:false,
            message:"email not found"
        })
    }
    try{

    }
    catch(error){
        console.error("Error at login", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

exports.newcollection=async(req,res)=>{
    let products=await Product.find({});

        let newcollections=products.slice(1).slice(-8);
        res.send(newcollections);

}

exports.popularinwomen=async(req,res)=>{
    let products=await Product.find({category:'women'});

        let popularinwomens=products.slice(0,4);
        res.send(popularinwomens);
}

exports.addtocart=async(req,res)=>{
    let userData=await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await User.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
}


exports.removetocart=async(req,res)=>{
    let userData=await User.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId]-=1;
        await User.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
        res.send("removed")
    }
}

exports.getcart=async(req,res)=>{
    let userData=await User.findOne({_id:req.user.id});
    console.log(userData.cartData)
    res.json(userData.cartData);

}