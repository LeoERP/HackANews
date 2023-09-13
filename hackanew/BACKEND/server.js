const express = require('express');
const app = express();
const PORT = 3000;
const hackanews = require('hackanews');

const usersRouter = require('./routes/usersRouter');

app.use(hackanews);
app.use(express.json());

app.use("/users", usersRouter);

app.use((req, res, next) => {
    console.log('Pasa una petición.');
    req.cohete = '🚀';
    next();
});
app.get('/', (req, res) => {
    res.status(200).send(`${req.cohete} Bienvenido a Hack a News ${req.cohete}`);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

})