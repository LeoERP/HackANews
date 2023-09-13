const usersRouter = require('express').Router();
const addUsers = require('../users/addUser');


usersRouter.post('/', addUser)

module.export = usersRouter;