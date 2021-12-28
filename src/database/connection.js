const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chat' , {useNewUrlParser: true  } ).then(connect=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})