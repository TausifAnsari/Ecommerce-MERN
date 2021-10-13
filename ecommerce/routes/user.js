const express = require('express');
const router = express.Router();

// using controller
const {signUp} = require("../controllers/user")

router.post("/signup", signUp);

module.exports = router;
