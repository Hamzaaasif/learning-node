var mysql = require('mysql');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

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
  con.query (sql , data , (err , result)=>{
    if( result[0].email != null)
    {
      return res.status(403).json({
        error : "Error: User already exists..."
      })
    }
    else{
      let data = {user_name:req.body.user_name , email:req.body.email , hashedPassword: securePassword(req.body.hashedPassword) , creationDate: "NOW()"}
      console.log(securePassword(req.body.hashedPassword));
      let sql = "insert into users SET ?"
       con.query(sql , data , (err , result)=>{
       // await;
        res.status(200).json({result})
      })

    } 
  })
}

function securePassword(password){
   this._password = password;
    this.salt = uuidv1();
    return this.hashedPassword = encryptPassword(password);
}

function encryptPassword(password){
    if(!password) return "Error";
    try{
      return crypto.createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
    }
    catch{
      return "error catched";
    }
  
}

function autheticateUser(password)
{
  return encryptPassword(password) == this.hashedPassword; 
}