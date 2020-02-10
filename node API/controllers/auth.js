var mysql = require('mysql');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"nodesql"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected.....");
   
});


exports.signup = async(req , res)=>{
  let sql = "SELECT email FROM users WHERE email = ? "
  let data = req.body.email;
  var temp = await con.query (sql , data , (err , rows )=>{
    if(err == null && rows[0]==null)
    { 
      var tempsalt = uuidv1();
      //console.log(result[0].email)
      let userdata = {
        user_name:req.body.user_name,
        email:req.body.email,
        hashedPassword: securePassword(req.body.hashedPassword , tempsalt),
        salt: tempsalt,
        creationDate: new Date()
      }
      console.log("hased password " , userdata.hashedPassword);
      let sql = "insert into users SET ?"
       con.query(sql , userdata , (err , result)=>{
       // await;
        res.status(200).json({message:"Signup Sucess please login to continue..."})
      })
       return 403
    }
    else {
      return res.status(403).json({
        error : "Error: User already exists..." 
      })
    } 
  })
}


//for sign in process

exports.signin= (req , res)=>{

  //find user
  const {email , hashedPassword } = req.body
  let sql = "SELECT * FROM users WHERE email = ? "
  con.query(sql, email,(err , result )=>{
    if(err == null && result=="")
    {
      return res.status(401).json({
        error : "User doesnot exist , please sign up first .."
      })
    }
    else
    {

      const matchedpass = securePassword(hashedPassword , result[0].salt) 

      if(result[0].hashedPassword == matchedpass)
      {
        //creating jwt tokens 
        const token  = jwt.sign({_id : result[0].user_id} , process.env.JWT_SECRET);
        //process the token as cookie with expire 
        res.cookie("t",token ,{expire: new Date() + 9999} )

        //res send with token to front end client
        const {user_id , user_name , email}  = result[0]
        return res.json({token , user:{ user_id , user_name , email}})

      }
      else
      {
        return res.status(401).json({
          error: "Email and password doesnot match ... "
        })
      } 
    }

  })
  
}




exports.signout = (req , res)=>{
  res.clearCookie("t")
  return res.json({message : "Sign out successfull !!.."})
}



exports.requireSignin = expressJwt({
  secret : process.env.JWT_SECRET,
  userProperty : "auth"
})




function autheticateUser(password , salt)
{
  return encryptPassword(password , salt) ;
}


function securePassword(password , salt){
   this._password = password;
    return this.hashedPassword = encryptPassword(password , salt);
}

function encryptPassword(password , salt){
    if(!password) return "Error";
    try{
      return crypto.createHmac('sha1', salt)
      .update(password)
      .digest('hex');
    }
    catch{
      return "error catched";
    }
  
}


