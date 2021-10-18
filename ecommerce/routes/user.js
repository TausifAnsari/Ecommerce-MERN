const express = require('express');
const router = express.Router();

// using controller
const {signUp} = require("../controllers/user")
const {userSignupValidator} = require('../validator/index')

router.post("/signup", userSignupValidator, signUp);

module.exports = router;

