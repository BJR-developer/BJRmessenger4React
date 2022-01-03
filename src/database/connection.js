const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://bjrweatherforecast:BjrWeatherForecast@weather.jl5yz.mongodb.net/freelancerbjr?retryWrites=true&w=majority' || process.env.MONGODB_URL , {useNewUrlParser: true  } ).then(connect=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})