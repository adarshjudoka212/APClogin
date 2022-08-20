const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");

const Register = require("./models/registers");
const PORT = process.env.PORT || 3000;


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false})); 

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res) => {
    res.render("index")
});
app.get("/register",(req,res) =>{
    res.render("register");
})
app.get("/login",(req,res) =>{
    res.render("login");
})
//new user in database
app.post("/register",async(req,res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        
        if (password == cpassword) {
          const registerStudent = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname ,
            email: req.body.email ,
            course: req.body.course ,
            phone: req.body.phone ,
            password:password,
            confirmpassword:confirmpassword
          })  
          const registered = await registerStudent.save();
          res.status(201).render("index");


        }else{
            res.send("password are not matching")
        }

        //console.log(req.body.firstname);
        //res.send(req.body.firstname);

    }catch(error){
    
    res.status(400).send(error);
    }
})


//login authentication
app.post("/login",async(req,res)=>{
    try {
        const email =req.body.email;
        const password=req.body.password;

        const useremail= await Register.findOne({email:email});
        //res.send(useremail.password);
        //console.log(useremail);
        if(useremail.password==password){
            res.status(201).render("index");
        }else{
            res.send("invalid login");
        }
        //console.log('${email} and password is ${password}')
    } catch (error) {
       res.status(400).send("invalid login ") 
    }
})


////logout
//app.get('/logout', function (req, res, next) {
//	console.log("logout")
//	if (req.session) {
//    // delete session object
//    req.session.destroy(function (err) {
//    	if (err) {
//    		return next(err);
//    	} else {
//    		return res.redirect('/');
//    	}
//    });
//}
//});
//
////forget password
//app.get('/forgetpass', function (req, res, next) {
//	res.render("forget.ejs");
//});
//
//app.post('/forgetpass', function (req, res, next) {
//	//console.log('req.body');
//	//console.log(req.body);
//	User.findOne({email:req.body.email},function(err,data){
//		console.log(data);
//		if(!data){
//			res.send({"Success":"This Email Is not regestered!"});
//		}else{
//			// res.send({"Success":"Success!"});
//			if (req.body.password==req.body.passwordConf) {
//			data.password=req.body.password;
//			data.passwordConf=req.body.passwordConf;
//
//			data.save(function(err, Person){
//				if(err)
//					console.log(err);
//				else
//					console.log('Success');
//					res.send({"Success":"Password changed!"});
//			});
//		}else{
//			res.send({"Success":"Password does not matched! Both Password should be same."});
//		}
//		}
//	});
//	
//});
//
//module.exports = app;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})
