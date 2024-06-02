export const sendToken=(message,user,res,statusCode)=>{
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true //cookie cannot be accessed or modified by the browser
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        message,
        user
    })
    
}