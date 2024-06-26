import React, { useState } from "react";
import './Styles/AgregarPeliculasAdmin.css';
import { useNavigate } from "react-router-dom";

function EditarPeliculasAdmin() {
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
        titulo,
        sinopsis,
        precio,
        director,
        estreno, // corregido aquí
        duracion,
        genero,
        imagen,
    }

    const handleActualizar = (event) => {
        event.preventDefault();

        fetch(`http://localhost:5000/admin/pelicula/${titulo}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            alert(res.response)
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
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Editar Películas</h2>

                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tituloInput"
                                        placeholder="Star Wars: Episodio III - La venganza de los sith"
                                        onChange={(e) => setTitulo(e.target.value)}
                                        value={titulo}
                                    />
                                    <label htmlFor="tituloInput">Titulo de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sinopsisInput"
                                        placeholder="¡Guerra! La República se desmorona bajo los ataques del despiadado Lord Sith, el conde Dooku..."
                                        onChange={(e) => setSinopsis(e.target.value)}
                                        value={sinopsis}
                                    />
                                    <label htmlFor="sinopsisInput">Sinopsis de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="precioInput"
                                        placeholder="Q150.00"
                                        onChange={(e) => setPrecio(e.target.value)}
                                        value={precio}
                                    />
                                    <label htmlFor="precioInput">Precio de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="directorInput"
                                        placeholder="George Lucas"
                                        onChange={(e) => setDirector(e.target.value)}
                                        value={director}
                                    />
                                    <label htmlFor="directorInput">Director de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="estrenoInput"
                                        placeholder="2005"
                                        onChange={(e) => setEstreno(e.target.value)}
                                        value={estreno}
                                    />
                                    <label htmlFor="estrenoInput">Año de Estreno de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="duracionInput"
                                        placeholder="2h y 20 min"
                                        onChange={(e) => setDuracion(e.target.value)}
                                        value={duracion}
                                    />
                                    <label htmlFor="duracionInput">Duración de la Película</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="generoInput"
                                        placeholder="Ciencia Ficción"
                                        onChange={(e) => setGenero(e.target.value)}
                                        value={genero}
                                    />
                                    <label htmlFor="generoInput">Género</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imagenInput"
                                        placeholder="*Inserte Póster de Star Wars: Episodio III - La venganza de los sith*"
                                        onChange={(e) => setImagen(e.target.value)}
                                        value={imagen}
                                    />
                                    <label htmlFor="imagenInput">Imagen o Póster de la Pelicula</label>
                                </div>
                                <div className="text-center">
                                    <button onClick={handleActualizar} id="botonActualizar" className="btn btn-outline-danger">Editar Pelicula</button>
                                    <button onClick={() => navigate("/InicioAdmin")} className="btn btn-outline-danger">Regresar a Inicio</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarPeliculasAdmin;
