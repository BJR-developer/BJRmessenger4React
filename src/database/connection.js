require("dotenv").config();
const mongoose = require('mongoose')
const localMongo = 'mongodb://localhost:27017/freelancerbjr'
mongoose.connect(  process.env.MONGODB_URI , {useNewUrlParser: true  } ).then(connect=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})