const express = require('express');
const app = express();
const postRoutes = require("./routes/routes");
const morgan = require('morgan');
const bodyparer = require('body-parser');
var cookieParser = require('cookie-parser')
const expressValidator = require('express-validator'); 
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const fs = require('fs') 
const cors = require('cors') 

//middleware
app.use(bodyparer.json());
app.use(morgan("dev"));
app.use(cookieParser())
app.use(cors())

//error handler
app.use(expressValidator());
//api docs
app.get("/",(req , res)=>{
  fs.readFile('docs/apidocs.json',(err , data)=>{
    if(err){
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs);
  })
})

//Routes
app.use("/", postRoutes); 
app.use("/" , authRoutes)
app.use("/" , userRoutes)

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorized!!..'});
  }
});



const portno = 8000;
app.listen(portno , ()=>   //port and call back function
{
  console.log("Server is running in http://localhost:8000");  
}); 
