const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    messages:String,
    sender:String,
    connections:String,
})

let chatModel = new mongoose.model('Chat' , schema);

module.exports = chatModel