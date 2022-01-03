const mongoose = require('mongoose')
// const MONGODB_URL = 'mongodb+srv://bjrweatherforecast:BjrWeatherForecast@weather.jl5yz.mongodb.net/chat?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost:27017/freelancerbjr' || MONGODB_URL , {useNewUrlParser: true  } ).then(connect=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})