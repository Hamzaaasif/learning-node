exports.createPostValidator = (req , res , next)=>{
  //for cus_CNIC
   req.check('Cus_CNIC',"CNIC is required..").notEmpty
   req.check('Cus_CNIC',"Invalid CNIC .. ").isLength({
     min:13 ,
     max:15
   })

   req.check('Cus_Name',"Name is required..").notEmpty
   req.check('Cus_Name',"Name must be b/w 5 to 50 length .. ").isLength({
    min:1 ,
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

exports.usersignupvalidator = (req , res , next)=>{
  //name su not null and b/t 4 to 10 characters
  req.check("user_name","Name is required..").notEmpty;
  req.check("email","Email is required or not valid email..")
  .matches(/.+\@.+\..+/)
  .withMessage("Email must contain @")
  .isLength({
    min:4,
    max:2000
  })
  //check for pass
  req.check("hashedPassword","Password is required..").notEmpty;
  req.check("hashedPassword","Password must contain 6 characters..")
  .isLength({
    min : 6
  })
  .matches(/\d/)
  .withMessage("Password must contain a number..")

  //check for errors
  const errors = req.validationErrors();

   if(errors)
   {
     const firstError = errors.map((error) =>error.msg)[0];
     return res.status(400).json({error:firstError});
   }
   next();
}