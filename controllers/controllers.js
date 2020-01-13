var mysql = require('mysql');
const bodyparser = require('body-parser');

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

exports.mainroute = function (req , res)
{
  res.send("This is main Route... )"); 
}



//for create post
exports.createposts = (req , res)=>{
  let data = {Cus_Name: req.body.Cus_Name , Cus_FatherName:req.body.Cus_FatherName, Cus_DOB:req.body.Cus_DOB ,Cus_Email : req.body.Cus_Email ,Cus_CNIC : req.body.Cus_CNIC , Cus_Tempadd:req.body.Cus_Tempadd  , Cus_PermetAdd :req.body.Cus_PermetAdd , Cus_Nationality :req.body.Cus_Nationality  ,Cus_Occupation : req.body.Cus_Occupation  } ;

  let sql = "INSERT INTO cus_info SET ?";

  con.query(sql,data ,(err , result)=>{
    // if(err){
    //   return res.status(400).json({
    //   error : err
    // })
    // }
    //else{
      res.status(400).json({
        post:result
      })      

    //}
    
  })
}


//for print whole customer info
exports.viewcusinfo = (req , res)=>{
  con.query("SELECT * FROM cus_info ",(err , rows , feilds)=>{
    if(err)throw err;
    res.send(rows);
  })

};

//searching by cnic
exports.searchbycnic = (req , res)=>{
 con.query("SELECT * FROM cus_info WHERE cus_CNIC = ? ",[req.params.id] , (err , rows , feilds)=>
 {
   if(err)throw err;
   res.send(rows);
 }) 
}

//deleting by cnic
exports.deletebycnic =(req , res)=>{
  con.query("DELETE FROM cus_info WHERE cus_CNIC=?",[req.params.id],(err , rows , feilds)=>{
    if(err)throw err;
    res.send("Deledted success..");
  })
}