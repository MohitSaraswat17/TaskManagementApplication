import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userSchema.js';
import cloudinary from 'cloudinary';
import { sendToken } from '../utils/jwtToken.js';


export const register =catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("User Data and Avatar Required!",400));

    }
    const {avatar} = req.files;
    const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/jpg",
        "image/avif",
    ];
    if(!allowedFormats.includes(avatar.mimetype)){
        return next(new ErrorHandler("Invalid AvatarImage Format!",400));
    }

    const {name,email,phone,password} = req.body;

    if(!name||!email||!phone||!password){
        return next(new ErrorHandler("All Fields are Required!",400));
    }

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User Already Exists!",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

    if(!cloudinaryResponse || cloudinary.error){
        console.log("CloudinaryError:",cloudinaryResponse.error || "Unknown Cloudinary Error")
    }


    user = await User.create({
        name,
        email,
        phone,
        password,
        avatar:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    
    });

    sendToken("User Registered Successfully!",user,res,200);


    // res.status(200).json({
    //     success:true,
    //     message:"User Registered Successfully!",
    // })

});


export const login =catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return next(new ErrorHandler("Please Provide email and Password!",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Credentials!",401));
    
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Credentials!",401));
    }

    sendToken("User Logged In Successfully!",user,res,200);

    // res.status(200).json({
    //     success:true,
    //     message:"User Logged In Successfully!",
    //     user,
    // });


});

export const logout =catchAsyncErrors((req,res,next)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        httpOnly:true //cookie cannot be accessed or modified by the browser
    }).json({
        success:true,
        message:"Logged Out Successfully!",
    });
});

export const myProfile =catchAsyncErrors((req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});