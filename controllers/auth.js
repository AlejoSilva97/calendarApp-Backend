//Importacion para ayudas "Snippets"
const {response} = require('express');
var bcrypt = require('bcryptjs');

//Importamos nuestro modelo de el ususario
const Usuario = require('../models/User');
const {generarJWT} = require('../helpers/jwt');

const loginUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        
        //Buscamos el email
        let user = await Usuario.findOne({email});

        //Si el user no existe respondemos con un error 
        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            });
        }

        //Comparamos los passwords
        const validPassword = bcrypt.compareSync( password, user.password);

        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Si todo lo anterior pasa, generamos el JWT
        const token = await generarJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        });

        // res.json({
        //     ok: true,
        //     msg: 'login',
        //     email,
        //     password
        // });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }

    

}

const createUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        
        //Buscamos si el correo ya esta registrado
        let user = await Usuario.findOne({email});

        //Si el user existe es por que ya ese email esta registrado
        if (user) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        //Instanciamos nuestro modelo de usuarios
        user = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardamos el usuario en la bd
        await user.save();

        //Generar JWT para iniciar seccion al registrar el usuario
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }

}

const renewToken = async(req, res = response) => {

    const {uid, name} = req;

    //Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid, 
        name
    });

}

module.exports = {
    loginUser,
    createUser,
    renewToken
};