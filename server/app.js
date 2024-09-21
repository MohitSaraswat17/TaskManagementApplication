import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbConnection} from './database/databaseConnection.js';
import fileUpload from 'express-fileupload';
import {ErrorMiddleWare} from "./middlewares/error.js"
import userRouter from "./routes/userRouter.js"
import taskRouter from "./routes/taskRouter.js"

const app = express();
dotenv.config({path:"./config/config.env"});


// CONNECTING FRONTEND TO BACKEND.
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true

}));

app.use(cookieParser())
app.use(express.json()); // To parse json format/pacd froyload to javascript object we use this.
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))


app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);

dbConnection();

app.use(ErrorMiddleWare)

export default app;

