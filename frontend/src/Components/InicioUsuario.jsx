import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button } from 'react-bootstrap';
import './Styles/InicioUsuario.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function InicioUsuario() {
    // Se declaran los estados iniciales
    const [peliculas, setPeliculas] = useState([]);
    // Se declaran las cookies, aunque no se usen algunos, se deben poner, sino tira error y no reconoce el removeCookie 
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [selectedPelicula, setSelectedPelicula] = useState(null);
    const navigate = useNavigate();

    // Este método se encarga de ejecutarse cuando la página se termine de renderizar o cargar en otras palabras
    useEffect(() => {
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/usuarios/peliculas/catalogo`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
                // Guardamos en un estado la respuesta que en este caso es un array de objetos json y antes de guardar el array
                // invertimos la lista
                setPeliculas(res.reverse());
            })
            .catch((error) => console.error(error));
    }, []);

    const handleAlquilar = (item) => {
        console.log(cookies.usuario)
        const usuario = cookies.usuario;
        const correo = usuario.correo;
        console.log(correo)
        const titulo = item.titulo;
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/alquiler/${correo}/${titulo}`, {
            method: "POST",
        })
            .then((response) => response.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
            })
            .catch((error) => console.error(error));
    }

    const viewPelicula = (item) => {
        setSelectedPelicula(item);
    };

    const handleClose = () => {
        setSelectedPelicula(null);
    };

    // Este método se encarga de hacer logout
    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
    };

    return (
        <Fragment>
            <div className="login-background" style={{ display: "-ms-flexbox" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#201876" }}>
                    <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                        <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                            <li style={{ color: "white", marginRight: "35px" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/Comentarios">
                                    Crear Comentarios
                                </Link>
                            </li>
                            <li style={{ color: "white", marginRight: "35px" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/VerComentarios">
                                    Ver Comentarios
                                </Link>
                            </li>
                            <li style={{ color: "white", marginRight: "35px" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/Alquiler">
                                    Peliculas Alquiladas
                                </Link>
                            </li>
                            <li style={{ color: "white" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/EditarPerfil">
                                    Editar Perfil
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, flexDirection: "row-reverse", paddingRight: "5%" }}>
                        <button className="btn btn-outline-light" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", paddingTop: "5%" }}>
                                {
                                    peliculas.map((item, index) => (
                                        <div className="card mb-3" key={index} style={{ flex: "0 0 calc(25% - 20px)", maxWidth: "calc(25% - 20px)" }}>
                                            <img className="card-img-top" src={item.imagen} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.titulo}</h5>
                                                <button onClick={() => handleAlquilar(item)} id="botonAlquilar" className="btn btn-outline-danger">Alquilar Película</button>
                                                <button type="button" className="btn btn-outline-success" onClick={() => viewPelicula(item)}>Ver Detalles</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {selectedPelicula && (
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles del Pelicula</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Titulo:</strong> {selectedPelicula.titulo}</p>
                                <p><strong>Sinopsis:</strong> {selectedPelicula.sinopsis}</p>
                                <p><strong>Precio:</strong> {"Q." + selectedPelicula.precio + ".00"}</p>
                                <p><strong>Director:</strong> {selectedPelicula.director}</p>
                                <p><strong>Estreno:</strong> {selectedPelicula.estreno}</p>
                                <p><strong>Duración:</strong> {selectedPelicula.duracion + " min"}</p>
                                <p><strong>Genero:</strong> {selectedPelicula.genero}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </div>
        </Fragment>
    );
    
    
}

export default InicioUsuario;