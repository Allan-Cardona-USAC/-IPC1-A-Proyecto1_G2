import React, { useState } from "react";
import './Styles/AgregarPeliculasAdmin.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function AgregarPeliculasAdmin(){
    const [titulo, setTitulo] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [precio, setPrecio] = useState('');
    const [director, setDirector] = useState('');
    const [estreno, setEstreno] = useState('');
    const [duracion, setDuracion] = useState('');
    const [genero, setGenero] = useState('');
    const [imagen, setImagen] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // Evita la recarga de nuestro sitio web
        event.preventDefault();

        const buttonId = event.target.id;

            const data = {
                titulo: titulo,
                sinopsis: sinopsis,
                precio: precio,
                director: director,
                estreno: estreno,
                duracion: duracion,
                genero: genero,
                imagen: imagen                
            }
            // Este método se encarga de comunicarse con el backend con un endpoint específico, en este caso /login
            fetch(`http://localhost:5173/checkin`, {
                // Se especifica el tipo de método
                method: "POST",
                // Se parsea a json el cuerpo que se mandará
                body: JSON.stringify(data),
                // Se agregan los encabezados
                headers: {
                    "Content-Type": "application/json",
                },
            })
                // Se obtiene la respuesta y se pasa a json
                .then((response) => response.json())
                // Una vez se tiene la respuesta en json se realizará lo siguiente
                .then((res) => {
                    // Imprimimos en consola la respuesta
                    console.log(res)
                    // Validamos si las credenciales son correctas
                    if (res.success) {
                        // De la respuesta que mandó el backend guardamos únicamente el valor del atributo user
                        const dataUser = res.user;
                        // Mostramos el nombre y apellido del usuario
                        alert(`Welcome: ${dataUser.nombre} ${dataUser.apellido}`)
                        // Guardamos en las cookies lo que mandó el backend
                        setCookie('usuario', dataUser);
                        // Validamos el rol
                        if (dataUser.role === 0) {
                            // Navegamos a la ruta donde se encuentra la pantalla del admin
                            navigate('/admin')
                        } else if (dataUser.role === 1) {
                            // Navegamos a la ruta donde se encuentra la pantalla del usuario
                            navigate('/user')
                        }
                    } else {
                        // Si las credenciales están mal se muestra el siguiente mensaje.
                        alert(`Correo y/o contraseña incorrecta.`)
                    }
                    // Se limpian los estados
                    setNombre("")
                    setApellido("")
                    setGenero("")
                    setCorreo("")
                    setContrasenia("")
                    setFecha("")
                })
                .catch((error) => console.error(error));
    };

    return (
        <div className="login-background">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Agregar Películas</h2>
                                <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="tituloInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Star Wars: Episodio III - La venganza de los sith"
                                            onChange={(e) => setTitulo(e.target.value)}
                                            value={titulo}
                                        />
                                        <label htmlFor="floatingInput">Titulo de la Película</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="sinopsisInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="¡Guerra! La República se desmorona bajo los ataques del despiadado Lord Sith, el conde Dooku..."
                                            onChange={(e) => setSinopsis(e.target.value)}
                                            value={sinopsis}
                                        />
                                        <label htmlFor="floatingInput">Sinopsis de la Película</label>
                                    </div>            
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="precioInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="150.00"
                                            onChange={(e) => setPrecio(e.target.value)}
                                            value={precio}
                                        />
                                        <label htmlFor="floatingInput">Precio de la Película en Quetzales</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="directorInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="George Lucas"
                                            onChange={(e) => setDirector(e.target.value)}
                                            value={director}
                                        />
                                        <label htmlFor="floatingInput">Precio de la Película</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="estrenoInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="2005"
                                            onChange={(e) => setEstreno(e.target.value)}
                                            value={estreno}
                                        />
                                        <label htmlFor="floatingInput">Año de Estreno de la Película</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="duracionInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="140"
                                            onChange={(e) => setDuracion(e.target.value)}
                                            value={duracion}
                                        />
                                        <label htmlFor="floatingInput">Duración de la Película en Minutos</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="generoInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Ciencia Ficción"
                                            onChange={(e) => setGenero(e.target.value)}
                                            value={genero}
                                        />
                                        <label htmlFor="floatingInput">Género</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="imagenInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="*Inserte Póster de Star Wars: Episodio III - La venganza de los sith*"
                                            onChange={(e) => setImagen(e.target.value)}
                                            value={imagen}
                                        />
                                        <label htmlFor="floatingContrasenia">Imagen o Póster de la Pelicula</label>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-outline-danger">Guardar Pelicula</button>
                                        <button type="button" className="btn btn-outline-danger">Editar Pelicula</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgregarPeliculasAdmin;