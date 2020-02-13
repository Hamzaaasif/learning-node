const _ = require("lodash")
const crypto = require('crypto');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"nodesql"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected at controllers->users.....");
   
});



exports.userById = (req , res , next , id)=>{

   let query = "SELECT * FROM users WHERE user_id = ?"
   con.query(query , [id] , (err ,user)=>{
     if(err || user=="")
     {
       return res.status(400).json({error:"User not found..."})
     }
     
     req.profile = user; //add profile obj with user info
     next();
   }) 
}


exports.hasAuthorization = (req , res , next)=>{
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if(!authorized) {
    return res.status(403).json({
      error : "User is not authorized...."
    })
  }
}

exports.allUsers = (req , res)=>{
  let query = "select user_id,user_name,email,creationDate from users"
  con.query(query , (err ,users )=>{
    if(err)
    {
      return res.status(400).json({
         error : err
      })
    }
    res.json({users})
  })
}


exports.getUser = (req , res)=>{
  req.profile[0].hashedPassword = undefined;
  req.profile[0].salt = undefined;
  return res.json(req.profile);
}


exports.updateUser = (req , res , next)=>{
  let user  = req.profile[0]
  user = _.extend(user, req.body) 

  let sqlquery = 
  `UPDATE users SET
   user_name ='${user.user_name}',
   email ='${user.email}',
   hashedPassword = '${user.hashedPassword}',
   salt = '${user.salt}'
   where user_id = ${user.user_id}`;

  con.query(sqlquery,(err )=>{
    if(err)
    {
      return res.status(400).json({
        error:"Unable to update user : user not found or unauthorized"
      })
    }
    user.hashedPassword = undefined;
    user.salt = undefined;
    res.json({
      user
    })
  })

}