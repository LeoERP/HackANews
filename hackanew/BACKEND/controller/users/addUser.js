const { log } = require('console');
const sendQuery = require('../../db/connectToDB');
const newUserSchema = require('../../schemas/newUserSchema');
const bcrypt = require('bcrypt');
const createError = require('../../helpers/createError');

async function addUser(req, res, next) {  // funcion que manda los datos a la base de datos

    const { error } = newUserSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.message));
    }

    const { user_name, user_email, user_password } = req.body



    try {   //* COMPRUEBA MAIL Y USER
        const [username] = await sendQuery('SELECT user_name FROM users WHERE user_name = ?', [user_name]);
        if (username) {
            const error = createError(409, 'El nombre de usuario ya existe')
            return next(error);
        }
        const [useremail] = await sendQuery('SELECT user_email FROM users WHERE user_email = ?', [user_email]);
        if (useremail) {
            const error = createError(409, "El email ya existe")
            return next(error);
        }
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const result = await sendQuery('INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)', [user_name, user_email, hashedPassword]);

        //console.log(result);

        res.send({
            status: 'success',
            userid: result.insertId,
            user_name,
            user_email,

        });
    }


    catch (error) {
        return next(createError(500, error.message));
    }

}

module.exports = addUser
