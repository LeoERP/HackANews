const express = require('express');
const router = express.Router();

const authUser = require('../middlewares/authUser');
const addEntry = require('../controllers/entries/addEntry');



router.get('/', __________);    //!COMPLETAR PARTE DE MOSTRAR LAS ENTRADAS DE FORO
router.post('/', authUser, addEntry);
router.delete('/:entryId', authUser, ___________);  //! PARA ELIMINAR LAS ENTRADAS DE FORO



module.export = entriesRouter;