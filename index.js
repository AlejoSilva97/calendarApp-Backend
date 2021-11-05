
const express = require('express');
var cors = require('cors')

const { dbConnection } = require('./database/config');
require('dotenv').config();


//Creamos el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );


//rutas
app.use('/api/auth', require('./routes/auth')); //Todo lo que exporte './routes/auth' se va a habilitar en la ruta '/api/auth'

//CRUD eventos: insertar, leer, actualizar, borrar
app.use('/api/events', require('./routes/events'));


//Escuchamos las peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})