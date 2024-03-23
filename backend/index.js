 const express=require("express");
 const app=express();
 const mongoose=require("mongoose");
 const jwt=require("jsonwebtoken");
 const multer=require("multer");
 const path=require("path");
 const cors=require("cors");
 require("dotenv").config();


 app.use(express.json());
 app.use(cors());

 //database connection
 const db=require('./config/db');
 db.db_connection();

 //IMAGE STOARGE Engine

 const storage=multer.diskStorage({
    destination:'./upload/images/',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
 });

 app.use('/images', express.static('upload/images'));
 const upload =multer({storage:storage});
 app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: true,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`

    });
});


 //ROUTES
 const route=require("./routes/route");
 app.use(route);

 //API CREATION
 app.listen(process.env.PORT,(error)=>{
    if(!error){
        console.log(`SERVER RUNNING AT ${process.env.PORT}`);
    }
    else{
        console.log("SERVER FAILED");
    }
 })