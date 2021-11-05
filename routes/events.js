
const {Router} = require('express'); //requerimos el router de express
const {check} = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fieldsValidate } = require('../middlewares/fieldsValidator');
const { isDate } = require('../helpers/isdate');


const router = Router();

router.use( validarJWT ); //Para aplicar este middleware a todas las rutas que esten debajo

router.get('/', getEvents);

router.post('/create/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),//isDate es un helper que nos ayudara a verificar que el campo sea una fecha
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        fieldsValidate
    ],
    createEvent
);

//Ruta para actualizar eventos
router.put('/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),//isDate es un helper que nos ayudara a verificar que el campo sea una fecha
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        fieldsValidate
    ],
    updateEvent
);

router.delete('/delete/:id', deleteEvent);

module.exports = router;