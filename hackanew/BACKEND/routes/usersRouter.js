const usersRouter = require('express').Router();
const addUsers = require('../users/addUser');
const express = require('express');

const authUser = require('../middlewares/authUser');

usersRouter.post('/', addUser)

module.export = usersRouter;