const Controllers = require("../controllers/controllers");
const express = require("express");
const router  = express.Router();
const {createPostValidator} = require('../validator/index')


router.get("/", Controllers.mainroute);
router.post("/createposts" , createPostValidator , Controllers.createposts);

router.get("/viewcusinfo",Controllers.viewcusinfo);
router.get("/searchbycnic/:id", Controllers.searchbycnic);
router.delete("/deletebycnic/:id", Controllers.deletebycnic);

module.exports = router;