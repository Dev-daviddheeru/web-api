const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const productRoute = require("./api/route/product");
const userRoute = require("./api/route/user")

mongoose.connect('mongodb+srv://Dheerendra:%40NdAfG%405PKz7%40Ga@david.wezwm.mongodb.net/?retryWrites=true&w=majority')
.then((result) => console.log("connection succeseful")
)
.catch(err=>{
    console.log(`${err}--- connection failed due to bad url`)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/product', productRoute);
app.use('/user', userRoute)




app.use((req, res, next)=>{
    res.status(404).json({
        error:"The url not found!"
    })
})


module.exports = app;