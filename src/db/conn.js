const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:3000",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connection sucessfull')
}).catch((e)=>{
    console.log("not connected")
})