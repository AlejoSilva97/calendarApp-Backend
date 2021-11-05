/*
    Rutas de usuarios / auth
    host + /api/auth
*/

const {Router} = require('express'); //requerimos el router de express
const {check} = require('express-validator');
const router = Router();

//importamos los controladores de las rutas
const { loginUser ,createUser, renewToken } = require('../controllers/auth');

//importamos nuestra validacion
const { fieldsValidate } = require('../middlewares/fieldsValidator');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidate
    ],
    loginUser
);

router.post('/register', 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidate
    ], 
    createUser
);

//Esta ruta solo llama un middleware
router.get('/renew', validarJWT, renewToken);

module.exports = router;