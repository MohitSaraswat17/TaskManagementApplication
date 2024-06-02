import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN-STACK-PROJECT-TASK-MANAGEMNT",

    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log(`Some Error occurred while connecting to database:${err}`);
    });
}