const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')

function genToken(email) {
    return jwt.sign({email} , process.env.TOKEN_SECRET , {expiresIn: '1h'})
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