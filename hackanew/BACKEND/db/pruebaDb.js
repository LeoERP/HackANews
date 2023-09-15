const sendQuery = require('./connectToDB')
require("dotenv").config()

sendQuery('SELECT * FROM users')