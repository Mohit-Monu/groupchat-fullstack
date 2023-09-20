require("dotenv").config()
const express=require('express')
const cors=require('cors');
const mongoose=require("mongoose")


const authroutes=require("./routes/AuthRoutes")
const forgetpassRoutes=require("./routes/forgetpassRoutes")
const GroupRoutes= require("./routes/GroupRoutes")
const AdminRoutes= require("./routes/AdminRoutes")


const app=express()
app.use(cors())
app.use(express.json()); 

app.use("/user",authroutes)
app.use("/password",forgetpassRoutes)
app.use("/group",GroupRoutes)
app.use("/admin",AdminRoutes)


mongoose.connect(process.env.MONGODB)
.then((res)=>{
    app.listen(process.env.PORT);
}).catch((err)=>{
    console.log(err);
})