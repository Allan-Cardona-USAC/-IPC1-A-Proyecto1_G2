import React, { useState, useEffect, Fragment } from "react";
import './Styles/InicioUsuario.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function VerComentarios() {
    const [posts, setPosts] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [validarEliminacion, setValidarEliminacion] = useState(false);
    const navigate = useNavigate();
    const usuarioActual = cookies.usuario;

    useEffect(() => {
        fetch(`http://localhost:5000/comentarios`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setPosts(res.reverse());
            })
            .catch((error) => console.error(error));
    }, [validarEliminacion]);

    const handleEliminar = (id) => {
        fetch(`http://localhost:5000/eliminarComentario/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                alert(res.mensaje);
                setValidarEliminacion(!validarEliminacion);
            })
            .catch(error => console.error("Error al eliminar el comentario:", error));
    }

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login');
    };

    return (
        <div className="login-background">
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#140B69" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                    <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/InicioUsuario">
                                Regresar a Inicio del Usuario
                            </Link>
                        </li>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/Comentarios">
                                Crear Comentarios
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
                                posts.map((item, index) => (
                                    <div className="card mb-3" key={index} style={{ flex: "0 0 calc(25% - 20px)", maxWidth: "calc(25% - 20px)" }}>
                                        <img className="card-img-top" src={item.image} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description}</p>
                                            <button 
                                                onClick={() => handleEliminar(item.id)} 
                                                id="botonEliminar" 
                                                className="btn btn-outline-danger"
                                                accessKey={ item.name !== usuarioActual}
                                            >
                                                Eliminar Comentario
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerComentarios;
