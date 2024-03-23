const mongoose =require("mongoose");
require("dotenv").config();


exports.db_connection=()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>console.log("DB CONNECTION SUCCESSFULLY"))
    .catch((error)=>console.log("DB CONNECTION FAILED",error))
}