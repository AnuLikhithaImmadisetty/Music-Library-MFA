const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const userRouter=require("./routes/users.js");
const cors=require("cors");

const MONGODB_URL=process.env.MONGODB_URL;
const PORT=process.env.PORT;

const app=express();

app.use(express.json()); 
app.use(cors({origin:"*"}));

main();
async function main(){
    const result= await mongoose.connect(MONGODB_URL);
    console.log(`MONGO Connected DB HOst: ${result.connection.host}`)
    app.listen(PORT,(req,res)=>{
        console.log(`app is listening at port no ${PORT}`);
    });
    

}

app.use("/",userRouter);











