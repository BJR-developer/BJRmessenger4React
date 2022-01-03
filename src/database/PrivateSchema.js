const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String,
        required:true},
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        minlength:6,
        required:true
    }
})

const bjrmodel = new mongoose.model("freelancerbjrcommunity" , schema)
module.exports = {
    bjrmodel,
}