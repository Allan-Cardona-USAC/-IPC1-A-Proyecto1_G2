// Dependencias a utilizar
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creamos nuestro backend usando el framework de express
const app = express();
// Especificamos a usar en nuestra maquina local
const PORT = 5000;

// Le especificamos al framework que se usara el parseo de tipo json y los cors
app.use(bodyParser.json());
app.use(cors());

// Base de datos de ejemplo
let dataUser = [];

// Estructura para recibir peticiones:
// app = variable con la que creamos nuestro backend haciendo uso del framework express
// .Tipo de metodo = GET, POST, PUT, DELETE
// "/url" = Endpoint que se quiere consultar
// req = recibe los parametros que vienen por parte del cliente
// res = se encarga de responder al cliente

/*/////////////////////----GET------//////////////////////////// */
// Creando un endpoint sencillo que retorne un mensaje
app.get('/', (req, res) => {
    let saludo = {
        Saludo: "Consultando la ruta Raiz",
        urlRaiz: "http://localhost:5000/"
    };
    res.json(saludo);
});

// Endpoint el cual retorna todos los usuarios almacenados
app.get('/usuarios', (req, res) => {
    res.json(dataUser);
});

// Endpoint el cual retorna un estudiante en especifico a partir de su correo
// /:correo es un parametro el cual no conocemos su valor, es una manera dinamica de obtener valores
app.get('/usuarios/:correo', (req, res) => {
    // Obtenemos el correo que viene en los parametros de la url
    //params es un objeto que contiene todas las variables que vienen en la url
    const correo = req.params.correo;
    /*Buscamos en la lista si existe algun objeto json con ese correo, 
    si no existe nos retorna null = false
    y si encuentra algun objetos con este correo nos retorna el objeto*/
    //.find() es una funcion que nos permite buscar dentro de un arreglo
    //siempre que vallamos a comparar usamos === es mas eficiente
    const user = dataUser.find(user => user.correo === correo);
    if (!user) {
        // Si no se encuentra retornamos este mensaje
        //status 4xx significa que hubo un error del lado del cliente
        res.status(404).send({ response: 'Usuario no encontrado' });
    } else {
        // Si encuentra al usuario retorna el objeto json con su info
        res.json(user);
    }
});
/*/////////////////////------POST------//////////////////////////// */
//Endpoint en el cual guardamos un nuevo usuario en la lista de usuarios,
//la info se manda en el body en formato json
app.post('/usuarios', (req, res) => {
    // Guardamos el cuerpo de la peticion
    const newUser = req.body;
    // Agregamos el estudiante a la lista
    dataUser.push(newUser);
   
    // Brindamos un mensaje de confirmacion
    //status 2xx significa que la peticion fue exitosa
    res.status(201).send({response:'Usuario creado correctamente'});
});
/*/////////////////////------PUT------//////////////////////////// */
// Endpoint con el cual actualizaremos los atributos de un objeto, menos su correo
app.put('/usuarios/:correo', (req, res) => {
    // Obtenemos el correo del objeto que se va a actualizar
    const correo = req.params.correo;
    // Obtenemos el cuerpo de la peticion en el cual vienen los nuevos valores
    const updatedUser = req.body;
    // Obtenemos el indice de la lista en donde 
    //se encuentra el objeto con el correo especificado
    const index = dataUser.findIndex(user => user.correo === correo);
    // Si no existe el objeto nos retorna un -1
    //el -1 es una convencion para indicar que no se encontro el objeto
    if (index === -1) {
        //status 4xx significa que hubo un error del lado del cliente
        res.status(404).send('Elemento no encontrado');
    } else {
        // Si se encontro el objeto, editamos sus atributos haciendo uso del indice
        dataUser[index].nombre = updatedUser.nombre;
        dataUser[index].apellido = updatedUser.apellido;
        dataUser[index].contraseña = updatedUser.contraseña;
        dataUser[index].nacimiento= updatedUser.nacimiento;
        //status 2xx significa que la peticion fue exitosa
        res.status(202).send('Usuario actualizado correctamente');
    }
});
/*/////////////////////------DELETE------//////////////////////////// */
// Endpoint con el cual eliminaremos un objeto de la lista de usuarios especifico
app.delete('/usuarios/:correo', (req, res) => {
    // Obtenemosel correo del objeto que se va a actualizar
    const correo = req.params.correo;
    // Obtenemos el indice de la lista en donde se encuentra el objeto con el correo
    const index = dataUser.findIndex(user => {
        // Verificamos si el carnet del objeto es igual al correo que se quiere eliminar
        console.log(user.correo)
        if (user.correo === correo) {
            console.log("--------------------");
            console.log("Usuario encontrado");
            console.log("--------------------");
            
            return user
            
        }
    });
    // Si no existe el objeto nos retorna un -1
    if (index === -1) {
        //status 4xx significa que hubo un error del lado del cliente
        res.status(404).send({ mensaje: 'Usuario no encontrado' });
        //else si existe el objeto
    } else {
        // Si se encontro el objeto, editamos sus atributos haciendo uso del indice
        // Eliminamos el objeto
        dataUser.splice(index, 1);
        //status 2xx significa que la peticion fue exitosa
        res.status(200).send({ mensaje: 'Usuario eliminado correctamente' });
        console.log(`Usuario eliminado correctamente ${correo}`)
    }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
