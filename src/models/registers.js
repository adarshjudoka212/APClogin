const mongoose =require("mongoose");
//const bcrypt = require("bcryptjs")
const studentSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname: {
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true,
        unique:true
    },
    course:{
        type:string,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    
    
})

//studentSchema.pre("save", async function(next){
//    if (this.isModified("password")) {
//        console.log('the current password is ${this.password}');
//        this.password=await bcrypt.hash(this.password);
//        console.log('the current password is ${this.password}');
//
//        this.confirmpassword = undefined;
//    }
//    
//    next();
//
//
//})





const Register = new mongoose.model("Register",studentSchema);
console.log
module.exports=Register;



