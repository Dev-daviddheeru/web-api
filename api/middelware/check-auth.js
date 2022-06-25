const jwt = require('jsonwebtoken');
// Here we have to require token from json response.

module.exports =  (req, res , next) =>{
   try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    // verifying that you are logged in as a developer.
    const verify = jwt.verify(token, "I am a developer.");
    console.log(verify);

    // verifying that you are logged in as an admin.

    if(verify.userType == "admin"){

    next()

    }else{
        if(verify.userType== "user"){
            return res.status(401).json({
                // msg:'User are not admin'
                msg:'User is not an admin.'

            })
        }
    }
   }
   catch (error){
       console.log(error)
    return res.status(401).json({
        msg:'invalid token.'
    })
   }
}