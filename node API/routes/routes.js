const {createposts,viewcusinfo,searchbycnic, deletebycnic} = require("../controllers/controllers");
const express = require("express");
const router  = express.Router();
const {requireSignin} = require("../controllers/auth") ;
const {userById} = require("../controllers/users") ;
const {createPostValidator} = require('../validator/index')


router.post("/createposts" , createPostValidator , createposts);
router.param("user_id" , userById)

router.get("/viewcusinfo" , requireSignin , viewcusinfo);
router.get("/searchbycnic/:id", searchbycnic);
router.delete("/deletebycnic/:id", deletebycnic);

module.exports = router; 