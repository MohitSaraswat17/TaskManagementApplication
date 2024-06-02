import { User } from "../models/userSchema.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken';
import {} from "../models/userSchema.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"

export const isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("User is Not Authenticated ! Please Login to Access",401));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


    req.user = await User.findById(decoded.id); 

    next();
})