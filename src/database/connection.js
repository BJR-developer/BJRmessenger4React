const mongoose = require('mongoose')
const MONGODB = 'mongodb+srv://bjrweatherforecast:BjrWeatherForecast@weather.jl5yz.mongodb.net/freelancerbjr?retryWrites=true&w=majority'
mongoose.connect(MONGODB , {useNewUrlParser: true  } ).then(connect=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})