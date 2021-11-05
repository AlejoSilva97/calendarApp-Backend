const moment = require('moment');

//Este custom middleware recibe dos parametros el valor que vamos a validar y la peticion.
const isDate = (value) => {

    if( !value ) {
        return false;
    }

    const fecha = moment(value);
    if( fecha.isValid() ) {
        return true;
    }else{
        return false;
    }

}

module.exports = {isDate};