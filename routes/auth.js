const {signup , signin , signout} = require("../controllers/auth") ;
const express = require("express");
const router  = express.Router();
const {usersignupvalidator} = require('../validator/index')
const {userById} = require("../controllers/users") ;

router.post("/signup" , usersignupvalidator , signup); 
router.post("/signin" , signin )
router.get("/signout" , signout )


router.param("user_id" , userById)
module.exports = router; 