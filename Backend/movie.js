
// Base de datos de Usuarios
let dataMovie = [];


app.get('/usuarios/:correo/peliculas', (req, res) => {
    let ver = {
        Mensaje: "Ruta para consultar las peliculas",
        urlPeliculas: "http://localhost:5000/usuarios/peliculas"
    };
    res.json(ver);
});

