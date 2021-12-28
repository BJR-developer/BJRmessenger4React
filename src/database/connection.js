const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://bjrweatherforecast:BjrWeatherForecast@weather.jl5yz.mongodb.net/chat?retryWrites=true&w=majority' , {useNewUrlParser: true  } ).then(connect=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})