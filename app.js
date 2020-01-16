const express = require('express');
const app = express();
const postRoutes = require("./routes/routes");
const morgan = require('morgan');
const bodyparer = require('body-parser');
const expressValidator = require('express-validator'); 


//middleware
app.use(bodyparer.json());
app.use(morgan("dev"));
//error handler
app.use(expressValidator());
//Routes
app.use("/", postRoutes); //url call back function(req,res) 
app.use("/viewcusinfo" ,postRoutes);
app.post("/createposts",postRoutes);
app.use("/searchbycnic/:id", postRoutes);
app.delete("/deletebycnic/:id", postRoutes);
app.use("/checkvirtual" , postRoutes)

const authRoutes = require("./routes/auth");
app.use("/" , authRoutes)




const portno = 8000;
app.listen(portno , ()=>   //port and call back function
{
  console.log("Server is running in http://localhost:8000");  
}); 
