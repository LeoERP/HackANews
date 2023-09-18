const express = require("express")
const usersRouter = express.Router()

const addUser = require("../controller/users/addUser.js")

//const authUser = require("../middlewares/authUser")

usersRouter.post("/", addUser)

module.exports = usersRouter