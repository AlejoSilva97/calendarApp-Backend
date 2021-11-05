const {response} = require('express');
const {validationResult} = require('express-validator');

const fieldsValidate = (req, res = response, next) => {

    //Manejo de errores
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {//si hay un error se retorna pero no se llama a el next
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    //Esta funcion indica que el middleware paso y que se puede proseguir
    next()
}

module.exports = {
    fieldsValidate
}