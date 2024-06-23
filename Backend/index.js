//declarar las dependencias a utilizar
//const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Creacion del Backend usando el framework de  express
const app = express();
/*PUERTO que yo quiero abrir de mi computadora en el cual 
queremos que se abra el backend*/
const PORT = 5000;
/*// Nombre del archivo que nos dará persistencia de datos
const FILENAME = 'Usuarios.json';*/


//Especificarle al framework que vamos a usar body-parser y los cors
app.use(bodyParser.json);
app.use(cors());

// Base de datos de usuarios
let dataUser = [];

/*
## Estructura para recibir peticiones CRUD:
## app = variable con la que creamos nuestro backend haciendo uso del framework express
## .Tipo de metodo = GET, POST, PUT, DELETE
## "/url" = Endpoint que se quiere consultar
## req = recibe los parametros que vienen por parte del cliente
## res = se encarga de responder al cliente*/

// Creando un endpoint sencillo que retorne un mensaje
// ruta raiz o url seria '/'
app.get('/', (req, res) => {
    //crear un objeto json en javascript
    let saludo = {
        Mesaje: "Estamos ubicados en la ruta Raiz!",
        urlEjemplo: "http://localhost:5000/"
    };
    //responder al cliente con un json
    res.json(saludo);
});

//levantar nuestro servidor por primera vez
//VAMOS A UTILIZAR UNA FUNCION FLECHA
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});