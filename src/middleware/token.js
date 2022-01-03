const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')

function genToken(email) {
    return jwt.sign({email} , 'f672618ad818a21e961d46ddac3033cd0e9a6eb508375dcc5ee5eb53c101885354e7dacdf492176fd697ab1b5992dccb0d0afb658a9db3bc65c068e91e997884' , {expiresIn: '1h'})
}

function authToken(req,res,next) {
    jwt.verify(req.cookies.token , process.env.TOKEN_SECRET  , (err ,data)=>{
        if(err){
            return res.redirect("/login")
        }else{
            console.log(data);
            next()
        }
    })
}
module.exports = {
    genToken , authToken
}