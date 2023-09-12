const express = require('express');
const { body, validationResult } = require('express-validator');
const userService = require('./../service/user_service');
const router = express.Router();


const validations = [
    body("username").exists().isString().notEmpty(),
    body("email").exists().isEmail().notEmpty(),
    body("password").exists().isString().notEmpty(),
    body("biography").exist().isString(),
    body("birthdate").exist().isDate(),
]



const registerController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            const result = await userService.registerUser(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

router.post("/user/register", validations, registerController);

module.exports = router;