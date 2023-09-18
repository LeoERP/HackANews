require('dotenv').config();

const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../../helpers/createError');
const sendQuery = require('../../db/connectToDB');

async function loginUser (req, res, next) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return next(createError(400, 'Datos Incorrectos')); 
    }
    
    const { email, password } = req.body;

    try {
        const [user] = await sendQuery('SELECT * FROM users WHERE user_email  = ?', [email]);
        if (!user) {
            return next(createError(401, 'Email o Password son inválidos'));
        }
        const validPassword = await bcrypt.compare(password, user.user_password);
        if (!validPassword) {
            return next(createError(401, 'Email o Password son inválidos'));
        }

        if (!user.active) {
            return next(createError(403, 'Verifique su correo para activar su cuenta'));
        }

        const infoUser = {
            userId: user.user_id
            userName: user.user_name
        };

        const token = jwt.sign(infoUser, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        res.header({ 'x-access-token': token });

        res.send({
            ok: true,
            data: {
                token,
                username: user.user_name
            },
            error: null,
            message: 'Login correcto'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = loginUser;

