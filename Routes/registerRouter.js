const express = require("express");
const router = express.Router();
const {Register , Login} = require("../Controller/register");

router.post("/registration", Register);
router.post('/login', Login);


module.exports = router;
