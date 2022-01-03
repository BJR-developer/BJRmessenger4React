const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email:String,
    messages:String,
    sender:String,
    connections:String,
})

let chatModel = new mongoose.model('messenger' , schema);

module.exports = chatModel