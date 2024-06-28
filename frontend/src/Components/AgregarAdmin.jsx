import React, { useState } from "react";
import './Styles/AgregarPeliculasAdmin.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function AgregarPeliculasAdmin() {
    const [titulo, setTitulo] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [precio, setPrecio] = useState('');
    const [director, setDirector] = useState('');
    const [estreno, setEstreno] = useState('');
    const [duracion, setDuracion] = useState('');
    const [genero, setGenero] = useState('');
    const [imagen, setImagen] = useState('');

    const navigate = useNavigate();

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



    const handleGuardar = (event) => {
        event.preventDefault();

        // Este método se encarga de comunicarse con el backend con un endpoint específico, en este caso /login
        fetch(`http://localhost:5000/admin/registro/pelicula`, {
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
                // Mostramos el nombre y apellido del usuario
                Swal.fire({
                    title: 'Pelicula Guardada',
                    text: 'Pelicula '+ data.titulo  + ` ha sido registrado`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                // Se limpian los estados
                setTitulo("")
                setSinopsis("")
                setPrecio("")
                setDirector("")
                setEstreno("")
                setDuracion("")
                setGenero("")
                setImagen("")
            })
            .catch((error) => console.error(error));
    };
    return (
        <div className="login-background">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <div className="card" style={{backgroundColor:"silver"}}>
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Agregar Películas</h2>

                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
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
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
                                    <textarea
                                        className="form-control"
                                        id="floatingTextarea"
                                        placeholder="¡Guerra! La República se desmorona bajo los ataques del despiadado Lord Sith, el conde Dooku..."
                                        onChange={(e) => setSinopsis(e.target.value)}
                                        value={sinopsis}
                                        style={{ height: "50px", overflowY: "auto" }} // Ajusta la altura según sea necesario
                                    />
                                    <label htmlFor="floatingTextarea">Sinopsis de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="floatingPrecio"
                                        placeholder="Q150.00"
                                        onChange={(e) => setPrecio(e.target.value)}
                                        value={precio}
                                        step="0.01" // Permite valores decimales
                                        min="0" // Evita valores negativos
                                    />
                                    <label htmlFor="floatingPrecio">Precio de la Película (Q)</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
                                    <input
                                        type="directorInput"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="George Lucas"
                                        onChange={(e) => setDirector(e.target.value)}
                                        value={director}
                                    />
                                    <label htmlFor="floatingInput">Director de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="floatingDate"
                                        placeholder="2005-05-19"
                                        onChange={(e) => setEstreno(e.target.value)}
                                        value={estreno}
                                    />
                                    <label htmlFor="floatingDate">Fecha de Estreno de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="floatingDuracion"
                                        placeholder="140" // Ejemplo de duración en minutos
                                        onChange={(e) => setDuracion(e.target.value)}
                                        value={duracion}
                                        min="0" // Evita valores negativos
                                    />
                                    <label htmlFor="floatingDuracion">Duración de la Película (minutos)</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
                                    <select
                                        className="form-control"
                                        id="floatingGenero"
                                        onChange={(e) => setGenero(Array.from(e.target.selectedOptions, option => option.value))}
                                        value={genero}
                                    >
                                        <option value="Acción">Acción</option>
                                        <option value="Comedia">Comedia</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                                        <option value="Terror">Terror</option>
                                    </select>
                                    <label htmlFor="floatingGenero">Géneros de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%", padding: "5px" }}>
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
                                    <button onClick={handleGuardar} id="botonGuardar" class="btn btn-outline-success">Guardar Pelicula</button>

                                    <button onClick={() => navigate("/InicioAdmin")} className="btn btn-outline-danger">Regresar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgregarPeliculasAdmin;