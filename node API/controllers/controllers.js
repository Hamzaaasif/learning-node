var mysql = require('mysql');


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


//for create post
exports.createposts = (req , res)=>{
  let data = {Cus_Name: req.body.Cus_Name , Cus_FatherName:req.body.Cus_FatherName, Cus_DOB:req.body.Cus_DOB ,Cus_Email : req.body.Cus_Email ,Cus_CNIC : req.body.Cus_CNIC , Cus_Tempadd:req.body.Cus_Tempadd  , Cus_PermetAdd :req.body.Cus_PermetAdd , Cus_Nationality :req.body.Cus_Nationality  ,Cus_Occupation : req.body.Cus_Occupation  } ;

  let sql = "INSERT INTO cus_info SET ?";

  con.query(sql,data ,(err , result)=>{
      res.status(400).json({
        post:data
      })      
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
 con.query("SELECT * FROM cus_info WHERE cus_CNIC = ? ",[req.params.id] , (err , rows )=>
 {
   if(err || rows==""){
     return res.status(404).json({error : "User not found with that cnic.."})
   };
   res.send(rows);
 }) 
}

//deleting by cnic
exports.deletebycnic =(req , res)=>{
  con.query("DELETE FROM cus_info WHERE cus_CNIC=?",[req.params.id],(err , rows , feilds)=>{
    if(err)
    {
      res.status(400).json({
        error:"Customer not found with that cnic"
      })
    };
    res.send("Deledted success..");
  })
}




