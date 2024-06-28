// Dependencias a utilizar
// fs = file system, se utiliza para leer y escribir archivos
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*-----------------------------------------------------------------*/
/*/////////////////////----Variables------/////////////////////////*/
/*-----------------------------------------------------------------*/

// Creamos nuestro backend usando el framework de express
const app = express();
// Especificamos a usar en nuestra maquina local
const PORT = 5000;
// Nombre del archivo que nos dará persistencia de datos
const FILENAME = 'Usuarios.json';
//Nombre del archivo que nos dará persistencia de datos
const FILENAMEMOVIE = 'Peliculas.json';
//Nombre del archivo que nos dará persistencia de datos
const FILENAMECOMMENT = 'Comentarios.json';
//Nombre del archivo que nos dará persistencia de datos
const FILENAMERECORD = 'Historial.json';

/*-----------------------------------------------------------------*/
/*///////////----Especificaión del Framework------//////////////// */
/*-----------------------------------------------------------------*/

// Le especificamos al framework que se usara el parseo de tipo json y los cors
app.use(bodyParser.json());
app.use(cors());

/*-----------------------------------------------------------------*/
/*////////////////////----Base de Datos------///////////////////// */
/*-----------------------------------------------------------------*/

// Base de datos de Usuarios
let dataUser = [];

// Base de datos de Peliculas
let dataMovie = [];

// Base de datos de Reseñas
let dataComment = [];
// Base de datos de Historial de peliculas alquiladas
let dataRecord = [];

/*-----------------------------------------------------------------*/
/*/////////////////////---ARCHIVO-FILENAME---///////////////////// */
/*-----------------------------------------------------------------*/

// Verificar y crear archivo si no existe
if (!fs.existsSync(FILENAME)) {
    // Si el archivo no existe, crearlo con un array vacio 
    //usando la funcion writeFileSync
    fs.writeFileSync(FILENAME, JSON.stringify(dataUser));
} else {
    // Si el archivo existe, cargar los datos
    const fileData = fs.readFileSync(FILENAME, 'utf8');
    dataUser = JSON.parse(fileData);
}

// Función que ayuda a actualizar el contenido del archivo json
function updateDataFile() {
    //vamos a sobreescribir el archivo con la nueva informacion
    fs.writeFileSync(FILENAME, JSON.stringify(dataUser));
}
/*-----------------------------------------------------------------*/
/*//////////////////////--ARCHIVO-FILENAMEMOVIE--///////////////// */
/*-----------------------------------------------------------------*/

// Verificar y crear archivo si no existe
if (!fs.existsSync(FILENAMEMOVIE)) {
    // Si el archivo no existe, crearlo con un array vacio
    //usando la funcion writeFileSync
    fs.writeFileSync(FILENAMEMOVIE, JSON.stringify(dataMovie));
} else {
    // Si el archivo existe, cargar los datos
    const fileDataM = fs.readFileSync(FILENAMEMOVIE, 'utf8');
    dataMovie = JSON.parse(fileDataM);

}
// Función que ayuda a actualizar el contenido del archivo json
function updateDataFileM() {
    //vamos a sobreescribir el archivo con la nueva informacion
    fs.writeFileSync(FILENAMEMOVIE, JSON.stringify(dataMovie));
}
/*-----------------------------------------------------------------*/
/*/////////////////////--ARCHIVO-FILENAMECOMMENT--//////////////// */
/*-----------------------------------------------------------------*/

// Verificar y crear archivo si no existe
if (!fs.existsSync(FILENAMECOMMENT)) {
    // Si el archivo no existe, crearlo con un array vacio
    //usando la funcion writeFileSync
    fs.writeFileSync(FILENAMECOMMENT, JSON.stringify(dataComment));
} else {
    // Si el archivo existe, cargar los datos
    const fileDataC = fs.readFileSync(FILENAMECOMMENT, 'utf8');
    dataComment = JSON.parse(fileDataC);

}
// Función que ayuda a actualizar el contenido del archivo json
function updateDataFileC() {
    //vamos a sobreescribir el archivo con la nueva informacion
    fs.writeFileSync(FILENAMECOMMENT, JSON.stringify(dataComment));
}
/*-----------------------------------------------------------------*/
/*/////////////////////--ARCHIVO-FILENAMEA--//////////////// */
/*-----------------------------------------------------------------*/
// Verificar y crear archivo si no existe
if (!fs.existsSync(FILENAMERECORD)) {
    // Si el archivo no existe, crearlo con un array vacio
    //usando la funcion writeFileSync
    fs.writeFileSync(FILENAMERECORD, JSON.stringify(dataRecord));
} else {
    // Si el archivo existe, cargar los datos
    const fileDataR = fs.readFileSync(FILENAMERECORD, 'utf8');
    dataRecord = JSON.parse(fileDataR);

}
// Función que ayuda a actualizar el contenido del archivo json
function updateDataFileR() {
    //vamos a sobreescribir el archivo con la nueva informacion
    fs.writeFileSync(FILENAMERECORD, JSON.stringify(dataRecord));
}
/* Estructura para recibir peticiones:
 app = variable con la que creamos nuestro backend haciendo uso del framework express
 .Tipo de metodo = GET, POST, PUT, DELETE
 "/url" = Endpoint que se quiere consultar
 req = recibe los parametros que vienen por parte del cliente
 res = se encarga de responder al cliente */

/*-----------------------------------------------------------------*/
/*////////////////////////----GET------/////////////////////////// */
/*-----------------------------------------------------------------*/

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

// Endpoint el cual retorna todos los comentarios almacenados
app.get('/comentarios', (req, res) => {
    res.json(dataComment);
});

/*--------------------------------------------------------------------*/

//get para peliculas
app.get('/usuarios/peliculas', (req, res) => {
    let ver = {
        Mensaje: "Ruta para consultar las peliculas",
        urlPeliculas: "http://localhost:5000/usuarios/peliculas"
    };
    res.json(ver);
});
// Endpoint el cual retorna todas las Peliculas almacenados
app.get('/usuarios/peliculas/catalogo', (req, res) => {
    res.json(dataMovie);
});

/*--------------------------------------------------------------------*/

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
//Historial de Peliculas Alquiladas
app.get('/historial/:correo', (req, res) => {
    const correo = req.params.correo;
    const historial = dataRecord.filter(record => record.correo === correo).map(record => {
        let devueltoATiempo = true;
        let multa = 0;
        let horasExtra = 0;

        if (record.devuelto && record.fecha_devolucion > record.fecha_devolucion_esperada) {
            const tiempoExtra = record.fecha_devolucion - record.fecha_devolucion_esperada;
            horasExtra = Math.ceil(tiempoExtra / (1000 * 60 * 60));
            multa = 5 * horasExtra;
            devueltoATiempo = false;
        }

        return {
            ...record,
            devueltoATiempo,
            horasExtra,
            multa
        };
    });

    res.json(historial);
});

/*--------------------------------------------------------------------*/
/*///////////////////////------POST------//////////////////////////// */
/*--------------------------------------------------------------------*/


//Endpoint en el cual guardamos un nuevo usuario en la lista de usuarios,
//la info se manda en el body en formato json
app.post('/usuarios/registro', (req, res) => {
    // Guardamos el cuerpo de la peticion
    const newUser = req.body;
    // Agregamos el estudiante a la lista
    dataUser.push(newUser);
    updateDataFile();
    // Brindamos un mensaje de confirmacion
    //status 2xx significa que la peticion fue exitosa
    res.status(201).send({ response: 'Usuario creado correctamente' });
});

// Endpoint en el cual guardamos una nueva publicacion, la info se manda en el body en formato json
app.post('/nuevoComentario', (req, res) => {
    // Guardamos el cuerpo de la peticion
    const newPost = req.body;
    const savePost = {
        id: (dataComment.length + 1),
        description: newPost.description,
        image: newPost.image,
        name: newPost.name
    };
    // Agregamos el estudiante a la lista
    dataComment.push(savePost);
    updateDataFileC();
    // Brindamos un mensaje de confirmacion
    res.status(201).send({ response: 'Publicacion guardada correctamente.' });
});

// Endpoint en el cual recibimos los datos del usuario que se quiere loggear, se valida si el usuario existe o no
// en el array de usuarios y también se valida que su password sea correcto
app.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
    const user = dataUser.find(user => {
        console.log(user.correo)
        console.log(user.contraseña)
        if (user.correo === data.correo && user.contraseña === data.contraseña) {
            return user
        }
    });
    if (!user) {
        const response = {
            success: false,
            user: null
        }
        res.status(404).send(response);
    } else {
        const response = {
            success: true,
            user: user
        }
        res.json(response);
    }
});
/*--------------------------------------------------------------------*/

//Endpoint en el cual guardamos una nueva pelicula en la lista de Peliculas,
//la info se manda en el body en formato json
app.post('/admin/registro/pelicula', (req, res) => {
    // Guardamos el cuerpo de la peticion
    const newMovie = req.body;
    // Agregamos el estudiante a la lista
    dataMovie.push(newMovie);
    updateDataFileM();
    // Brindamos un mensaje de confirmacion
    //status 2xx significa que la peticion fue exitosa
    res.status(201).send({ response: 'Pelicula Nueva creado correctamente' });
});

/*--------------------------------------------------------------------*/
//Edpoint para alquilar una pelicula
app.post('/alquiler/:correo/:titulo', (req, res) => {
    const correo = req.params.correo;
    const titulo = req.params.titulo;
    const user = dataUser.find(user => user.correo === correo);
    const movie = dataMovie.find(movie => movie.titulo === titulo);

    if (!user || !movie) {
        res.status(404).send({ response: 'Usuario o película no encontrado' });
        return;
    }
    const fechaAlquiler = new Date();
    const fechaDevolucionEsperada = new Date(fechaAlquiler.getTime() + 48 * 60 * 60 * 1000); // 48 horas después

    const record = {
        correo: correo,
        titulo: titulo,
        fecha_alquiler: fechaAlquiler,
        fecha_devolucion_esperada: fechaDevolucionEsperada,
        devuelto: false
    };

    dataRecord.push(record);
    updateDataFileR();
    res.status(201).send({ response: 'Película alquilada correctamente', fechaDevolucionEsperada });
});


/*--------------------------------------------------------------------*/
/*////////////////////////------PUT------//////////////////////////// */
/*--------------------------------------------------------------------*/

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
        dataUser[index].nacimiento = updatedUser.nacimiento;
        updateDataFile();
        //status 2xx significa que la peticion fue exitosa
        res.status(202).send('Usuario actualizado correctamente');
    }
});

/*--------------------------------------------------------------------*/

// Endpoint con el cual actualizaremos los atributos de un objeto, 
// en este caso la pelicula sera Modificada completamente
app.put('/admin/pelicula/:titulo', (req, res) => {
    // Obtenemos el correo del objeto que se va a actualizar
    const titulo = req.params.titulo;
    // Obtenemos el cuerpo de la peticion en el cual vienen los nuevos valores
    const updatedMovie = req.body;
    // Obtenemos el indice de la lista en donde 
    //se encuentra el objeto con el titulo especificado
    const indexM = dataMovie.findIndex(admin => admin.titulo === titulo);
    // Si no existe el objeto nos retorna un -1
    //el -1 es una convencion para indicar que no se encontro el objeto
    if (indexM === -1) {
        //status 4xx significa que hubo un error del lado del cliente
        res.status(404).send('Elemento no encontrado');
    } else {
        dataMovie[indexM].titulo = updatedMovie.titulo// Si se encontro el objeto, editamos sus atributos haciendo uso del indice
        dataMovie[indexM].sinopsis = updatedMovie.sinopsis;
        dataMovie[indexM].precio = updatedMovie.precio;
        dataMovie[indexM].director = updatedMovie.director; // corregido aquí
        dataMovie[indexM].estreno = updatedMovie.estreno; // corregido aquí
        dataMovie[indexM].duracion = updatedMovie.duracion;
        dataMovie[indexM].genero = updatedMovie.genero;
        dataMovie[indexM].imagen = updatedMovie.imagen; // corregido aquí

        updateDataFileM();
        //status 2xx significa que la peticion fue exitosa
        res.status(202).send('Pelicula actualizado correctamente');
    }
});
app.put('/devolucion/:correo/:titulo', (req, res) => {
    const correo = req.params.correo;
    const titulo = req.params.titulo;
    const recordIndex = dataRecord.findIndex(record => record.correo === correo && record.titulo === titulo && !record.devuelto);

    if (recordIndex === -1) {
        res.status(404).send({ response: 'No se encontró un registro de alquiler activo para esta película' });
        return;
    }
    const record = dataRecord[recordIndex];
    const fechaDevolucion = new Date();
    record.fecha_devolucion = fechaDevolucion;
    record.devuelto = true;

    let mensaje = 'Película devuelta correctamente';
    let multa = 0;

    if (fechaDevolucion > record.fecha_devolucion_esperada) {
        const tiempoExtra = fechaDevolucion - record.fecha_devolucion_esperada;
        const horasExtra = Math.ceil(tiempoExtra / (1000 * 60 * 60));
        multa = 5 * horasExtra;
        mensaje += `. Se ha aplicado una multa de Q${multa} por devolución tardía (${horasExtra} horas extra).`;
    }
    updateDataFileR();
    res.status(202).send({ response: mensaje, multa });
});


/*--------------------------------------------------------------------*/
/*/////////////////////------DELETE------//////////////////////////// */
/*--------------------------------------------------------------------*/

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
        // Actualizamos el archivo
        updateDataFile();
        //status 2xx significa que la peticion fue exitosa
        res.status(200).send({ mensaje: 'Usuario eliminado correctamente' });
        console.log(`Usuario eliminado correctamente ${correo}`)
    }
});

/*--------------------------------------------------------------------*/

// Endpoint con el cual eliminaremos un objeto de la lista de pelicula especifico
app.delete('/admin/pelicula/:titulo', (req, res) => {
    // Obtenemosel correo del objeto que se va a actualizar
    const titulo = req.params.titulo;
    // Obtenemos el indice de la lista en donde se encuentra el objeto con el correo
    const indexM = dataMovie.findIndex(peli => {
        // Verificamos si el carnet del objeto es igual al correo que se quiere eliminar
        console.log(peli.titulo)
        if (peli.titulo === titulo) {
            console.log("--------------------");
            console.log("Pelicula encontrado");
            console.log("--------------------");

            return peli

        }
    });
    // Si no existe el objeto nos retorna un -1
    if (indexM === -1) {
        //status 4xx significa que hubo un error del lado del cliente
        res.status(404).send({ mensaje: 'Pelicula no encontrado' });
        //else si existe el objeto
    } else {
        // Si se encontro el objeto, editamos sus atributos haciendo uso del indice
        // Eliminamos el objeto
        dataMovie.splice(indexM, 1);
        // Actualizamos el archivo
        updateDataFileM();
        //status 2xx significa que la peticion fue exitosa
        res.status(200).send({ mensaje: 'Pelicula Eliminada correctamente' });
        console.log(`Pelicula eliminada correctamente: ${titulo}`)
    }
});
// Endpoint con el cual eliminaremos un objeto de la lista de pelicula especifico
app.delete('/eliminarComentario/:id', (req, res) => {
    // Obtenemosel id del objeto que se va a actualizar
    const id = req.params.id;
    // Obtenemos el indice de la lista en donde se encuentra el objeto con el id
    const indexE = dataComment.findIndex(coment => {
        // Verificamos si el carnet del objeto es igual al correo que se quiere eliminar
        console.log(coment.id)
        if (coment.id === parseInt(id)) {
            console.log("--------------------");
            console.log("Comentario encontrado");
            console.log("--------------------");
            return coment

        }
    });
    // Si no existe el objeto nos retorna un -1
    if (indexE === -1) {
        //status 4xx significa que hubo un error del lado del cliente
        res.status(404).send({ mensaje: 'Comentario no encontrado' });
        //else si existe el objeto
    } else {
        // Si se encontro el objeto, editamos sus atributos haciendo uso del indice
        // Eliminamos el objeto
        dataComment.splice(indexE, 1);
        // Actualizamos el archivo
        updateDataFileC();
        //status 2xx significa que la peticion fue exitosa
        res.status(200).send({ mensaje: 'Comentario Eliminada correctamente' });
        console.log(`Comentario eliminada correctamente: ${id}`)
    }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
