import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minlength:[3,"Name should be atleast 3 characters long"],
        maxlength:[30,"Name should not be more than 20 characters long"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email address"],
        unique:[true,"User Already registerd"],
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    phone:{
        type:Number,
        required:[true,"Please enter your phone number"],
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minlength:[8,"Password must contain atleast 8 characters"],
        maxlength:[32,"Password should not be more than 32 characters long"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    });
}


export const User = mongoose.model("User",userSchema);