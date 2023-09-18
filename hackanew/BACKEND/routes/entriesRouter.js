const express = require('express');
const entriesRouter = express.Router();

const authUser = require('../middlewares/authUser');
const addEntry = require('../controller/entries/addEntry.js')


// router.get('/', __________);    //!COMPLETAR PARTE DE MOSTRAR LAS ENTRADAS DE FORO
entriesRouter.post('/', authUser, addEntry);
// router.delete('/:entryId', authUser, ___________);  //! PARA ELIMINAR LAS ENTRADAS DE FORO



module.exports = entriesRouter;