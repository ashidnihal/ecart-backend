const jwt = require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
console.log('inside jwt middlware');
try{
    const token=req.headers['authorization'].slice(7)
    console.log(token);

    const jwtVerification=jwt.verify(token, process.env.JWTKEY)
    console.log(jwtVerification);
    req.payload=jwtVerification.userid
    next()
}
catch(err){
    res.status(401).json({"authorization errow":err.message})
}
}
module.exports=jwtMiddleware