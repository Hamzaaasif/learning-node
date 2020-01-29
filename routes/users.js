const express = require("express");
const router  = express.Router(); 
const {userById , allUsers , getUser , updateUser} = require("../controllers/users") ;
const {requireSignin} = require("../controllers/auth") ;

router.get("/getusers",allUsers)
router.get("/user/:userid", requireSignin , getUser)
router.put("/user/:userid", requireSignin , updateUser)

router.param("userid" , userById)
module.exports = router;   