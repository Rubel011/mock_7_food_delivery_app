const express=require("express");
const app=express();
const cors=require("cors");
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken")
require("dotenv").config()
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
const { restaurantRoute } = require("./routes/restaurant");

app.use(cors());
app.use(express.json());

app.get("/",async(req,res)=>{
    try {
        res.status(200).json({"message":"home page running fine"})
    } catch (error) {
        res.status(400).json({"err":"home page error"})
        
    }
})

app.use("/api",userRoute)
app.use("/api/restaurant",restaurantRoute)
app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log(`server is running at port ${process.env.port}`);
        
    } catch (error) {
        console.log("connection errr");
        
    }
})