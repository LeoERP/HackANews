const express = require("express")
const usersRouter = express.Router()

const loginUser = require('../controller/users/loginUser.js');
const addUser = require("../controller/users/addUser.js")

//const authUser = require("../middlewares/authUser")

usersRouter.post("/", addUser);
usersRouter.post('/login', loginUser);

module.exports = usersRouter

