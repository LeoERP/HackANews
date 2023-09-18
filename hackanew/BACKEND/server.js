const express = require('express');
const app = express();
const PORT = 3000;

const usersRouter = require('./routes/usersRouter.js');
const entriesRouter = require('./routes/entriesRouter.js');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(express.json());

app.use("/users", usersRouter);
app.use("/entries", entriesRouter);

app.use((req, res, next) => {
    console.log('Pasa una petición.');
    req.cohete = '🚀';
    next();
});
app.get('/', (req, res) => {
    res.status(200).send(`${req.cohete} Bienvenido a Hack a News ${req.cohete}`);
});

app.use(errorHandler);

//*Middleware Error 404: not found
app.use((req, res) => {
    res.status(404).send({
        ok: false,
        data: null,
        error: null,
        message: '404: not found'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

});

