const jwt = require("jsonwebtoken");
const HttpError = require("../Model/HttpError");
const User = require("../Model/User");

const loginController = (req,res,next)=>{
    
    const { username,password } = req.body;
    if(username === undefined || username === '' || password === undefined)
    {
        next(new HttpError('not a proper username or password',400));
    }
    if(req.user!==undefined)
    {
        if(req.user.username===username)
            res.status(200).json({"token":req.headers.authorization.split(' ')[1]});
    }
    User.find({username:username},(err,user)=>{
        if(err)
        {
            console.log(err);
            return next(new HttpError('database error',404));
        }
        else
        {
            if(user.length===0)
                return next(new HttpError('no such user found',403));
            else if(user[0].password!==password)
            {
                return next(new HttpError('incorrect username or password',403));
            }
            else
            {
                const tokenuser = {userId:user[0]._id,username:user[0].username}
                jwt.sign(tokenuser,process.env.TOKEN_SECRET,{expiresIn:'2d'},(err,token)=>{
                    if(err)
                    {
                        console.log(err)
                        return next(new HttpError('tokenization error',500));
                    }
                    else{
                        return res.status(200).json({"token":token});
                    }
                })
            }
        }
    })
    
}

module.exports = loginController;