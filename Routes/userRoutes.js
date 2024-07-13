
const express = require("express");
const router = express.Router();
const { getUsers,updateUser, deleteUser } = require("../Controller/user");

router.get('/', getUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id' , deleteUser)

module.exports = router;

