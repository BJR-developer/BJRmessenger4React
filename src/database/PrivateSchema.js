const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})

const userinfoModel = new mongoose.model("User Information" , schema);
module.exports = userinfoModel;