const {signup , signin} = require("../controllers/auth") ;
const express = require("express");
const router  = express.Router();
const {usersignupvalidator} = require('../validator/index')

router.post("/signup" , usersignupvalidator , signup); 
router.post("/signin" , signin )



module.exports = router;