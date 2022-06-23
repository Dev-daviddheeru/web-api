const jwt = require('jsonwebtoken');


module.exports =  (req, res , next) =>{
   try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, "I am developer");
    console.log(verify);
    if(verify.userType == "admin"){
    next()
    }else{
        if(verify.userType== "user"){
            return res.status(401).json({
                msg:'User are not admin'
            })
        }
    }
   }
   catch (error){
       console.log(error)
    return res.status(401).json({
        msg:'invalid token'
    })
   }
}