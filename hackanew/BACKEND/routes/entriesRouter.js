const express = require('express');
const router = express.Router();

const authUser = require('../middlewares/authUser');




router.get('/', __________);    //!COMPLETAR PARTE DE MOSTRAR LAS ENTRADAS DE FORO
router.post('/', authUser, ___________);  //! PARA GCAER LAS ENTRADAS DE FORO
router.delete('/:entryId', authUser, ___________);  //! PARA ELIMINAR LAS ENTRADAS DE FORO



module.export = entriesRouter;