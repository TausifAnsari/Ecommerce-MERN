const express = require('express');
const router = express.Router();

// using controller
const {sayHi} = require("../controllers/user")

router.get("/", sayHi);

module.exports = router;
