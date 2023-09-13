const sendQuery = require('../../db/connecToDB');
const newUserSchema = require('../../schemas/newUserSchema');

function addUser(req, res, next) {  // funcion que manda los datos a la base de datos

    const { error } = newUserSchema.validate(req.body);
    if (error) {   //! PENDIENTE DE CREAR ERROR PERSONALIZADO
        return next(createError(400, error.message));
    }

    const { name, email, password } = req.body;

}





