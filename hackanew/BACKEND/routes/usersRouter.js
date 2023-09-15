const express = require('express');
const usersRouter = express.Router();

const { loginUser } = require('../controllers/users');


usersRouter.post('/login', loginUser);

module.exports = usersRouter;

