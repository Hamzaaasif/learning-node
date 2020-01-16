exports.createPostValidator = (req , res , next)=>{
  //for cus_CNIC
   req.check('Cus_CNIC',"CNIC is required..").notEmpty
   req.check('Cus_CNIC',"Invalid CNIC .. ").isLength({
     min:13 ,
     max:15
   })

   req.check('Cus_Name',"Name is required..").notEmpty
   req.check('Cus_Name',"Name is require .. ").isLength({
    min:5 ,
    max:50
  })
   req.check('Cus_Occupation',"Occupation is required..").notEmpty

   const errors = req.validationErrors();

   if(errors)
   {
     const firstError = errors.map((error) =>error.msg)[0];
     return res.status(400).json({error:firstError});
   }
   next();
}