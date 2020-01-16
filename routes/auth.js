const auth = require("../controllers/auth") ;
const express = require("express");
const router  = express.Router();
//const {createPostValidator} = require('../validator/index')

router.post("/signup" , auth.signup); 



module.exports = router;