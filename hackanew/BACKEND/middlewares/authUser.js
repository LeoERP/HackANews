const createError = require('../helpers/createError');
const jwt = require('jsonwebtoken');


async function authUser(req, res, next) {
    const { 'authorization': token } = req.headers;
    if (!token) {
        return next(createError(401, 'No autenticado'));
    }

    let infoUser;
    try {
        infoUser = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return next(createError(401, 'Token incorrecto'));
    }

    req.user = infoUser;
    next();
}


module.exports = authUser;