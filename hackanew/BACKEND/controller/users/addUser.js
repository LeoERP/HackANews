const { log } = require('console');
const sendQuery = require('../../db/connecToDB');
const newUserSchema = require('../../schemas/newUserSchema');
const bcrypt = require('bcrypt');
const error = require('../../helpers/createError');


function addUser(req, res, next) {  // funcion que manda los datos a la base de datos

    const { error } = newUserSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.message));
    }

    const { user_name, user_email, user_password } = req.body;



    try {   //* COMPRUEBA MAIL Y USER
        const [user_name] = await sendQuery('SELECT name FROM users WHERE name = ?', [user_name]);
        if (user_name) {
            return next(createError(409, 'El nombre de usuario ya existe'));
        }
        const [user_email] = await sendQuery('SELECT email FROM users WHERE email = ?', [user_email]);
        if (user_email) {
            return next(createError(409, 'El email ya existe'));
        }
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const result = await sendQuery('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user_name, user_email, hashedPassword]);

        console.log(result);

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




module.export = addUser;
