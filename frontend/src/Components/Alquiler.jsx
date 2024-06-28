import React, { useState, useEffect, Fragment } from "react";
import './Styles/InicioUsuario.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function Alquiler() {
    // Se declaran los estados iniciales
    const [alquiler, setAlquiler] = useState([]);
    // Se declaran las cookies, aunque no se usen algunos, se deben poner, sino tira error y no reconoce el removeCookie 
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [validarActualizacion, setValidarActualizacion] = useState(false);
    const navigate = useNavigate();

    // Este método se encarga de ejecutarse cuando la página se termine de renderizar o cargar en otras palabras
    useEffect(() => {
        const usuario = cookies.usuario;
        const correo = usuario.correo;
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/historial/${correo}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
                // Guardamos en un estado la respuesta que en este caso es un array de objetos json y antes de guardar el array
                // invertimos la lista
                setAlquiler(res.reverse());
            })
            .catch((error) => console.error(error));
    }, [validarActualizacion]);

    const handleDevolver = (pelicula) => {
        const usuario = cookies.usuario;
        const correo = usuario.correo;
        const titulo = pelicula.titulo;

        fetch(`http://localhost:5000/devolucion/${correo}/${titulo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            //body: JSON.stringify(selectedUser)
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                Swal.fire({
                    title: 'Pelicula Devuelta',
                    text: `La pelicula ha sido devuelta con éxito`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setValidarActualizacion(() => !validarActualizacion);
            })
            .catch(error => console.error("Error al actualizar la película:", error));
    };


    // Este método se encarga de hacer logout
    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
    };


    return (
        <div className="login-background">
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#D41212" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                    <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                    <li style={{ color: "white", marginRight: "35px" }}>
                            {/* El link nos ayuda a navegar entre componentes, parecido al navigate */}
                            <Link style={{ color: "white", textDecoration: "none" }} to="/InicioUsuario">
                                Regresar a Inicio del Usuario
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
                    <div className="col-md-12 overflow-auto">
                        <div style={{ display: "flex", alignItems: "center", height: "90vh", width: "100%", top: "10" }}>
                            <div className="table-containerLP" >
                                <table className="table table-bordered text-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Fecha de Alquiler</th>
                                            <th>Fecha de Devolución</th>
                                            <th>Multa</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alquiler.map(pelicula => (
                                            <tr key={pelicula.titulo}>
                                                <td>{pelicula.titulo}</td>
                                                <td>{pelicula.fecha_alquiler}</td>
                                                <td>{pelicula.fecha_devolucion}</td>
                                                <td>{pelicula.multa}</td>

                                                <td>
                                                    <button type="button" className="btn btn-outline-success"onClick={() => handleDevolver(pelicula)}>Devolver</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alquiler;