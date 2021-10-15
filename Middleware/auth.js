const jwt=require('jsonwebtoken');

const auth = (req,res,next)=>{
    let token;
    //authorization header : bearer token
    try{
        token=req.headers.authorization.split(' ')[1];
    }
    catch{
        return next();
    }
    if(token==undefined)
        return next();
   
    jwt.verify(token,process.env.token_secret,(err,user)=>{
        if(err)
            console.log(err);
        req.user=user;
        next();
    })
}
module.exports = auth;