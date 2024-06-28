import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Styles/ListaPeliculas.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Admin() {
    // Se declaran los estados iniciales
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [validarEliminacion, setValidarEliminacion] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    // Este método se encarga de ejecutarse cuando la página se termine de renderizar o cargar en otras palabras
    // También se ejecuta cuando el estado validarEliminacion tiene algún cambio, es por eso que de último entre los 
    // corchetes se pone ese estado, para que monitoree si ese estado tiene un cambio de valor
    useEffect(() => {
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/usuarios/peliculas/catalogo`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
                // Guardamos en un estado la respuesta que en este caso es un array de objetos json
                setUsers(res);
            })
            .catch((error) => console.error(error));
    }, [validarEliminacion]);

    // Este método se encarga de eliminar un usuario en específico
    const deleteUser = (titulo) => {
        // Nos comunicamos con el backend en el endpoint especificado para eliminar un usario en específico
        fetch(`http://localhost:5000/admin/pelicula/${titulo}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                // Mostramos el nombre y apellido del usuario
                Swal.fire({
                    title: 'Pelicula Eliminada',
                    text: `Pelicula  ha sido eliminado`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                // Cambiamos el estado de validarEliminacion para que el useEffect se ejecute de nuevo
                setValidarEliminacion(() => !validarEliminacion)
            })
            .catch(error => console.error("Error al eliminar el usuario:", error));
    };

    const viewUser = (user) => {
        setSelectedUser(user);
    };

    const handleClose = () => {
        setSelectedUser(null);
    };

    // Este método se encarga de hacer logout
    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
    };

    return (
        <Fragment>
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#212529", flexDirection: "row-reverse", paddingRight: "5%", position:"fixed" }}>
                <button className="btn btn-outline-info" onClick={() => navigate("/InicioAdmin")}>
                    Volvel al Inicio
                </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", height: "90vh", width: "100%", top: "10" }}>
                <div className="table-containerLP" >
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Titulo</th>
                                <th>Precio</th>
                                <th>Director</th>
                                <th>Año Estreno</th>
                                <th>Duracion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.titulo}>
                                    <td>{user.titulo}</td>
                                    <td>{"Q." + user.precio}</td>
                                    <td>{user.director}</td>
                                    <td>{user.estreno}</td>
                                    <td>{user.duracion + "min."}</td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={() => deleteUser(user.titulo)} style={{ marginRight: "5%" }}>
                                            Eliminar
                                        </button>
                                        <button type="button" className="btn btn-outline-success"onClick={() => viewUser(user)}>Sinopsis</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedUser && (
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles del Pelicula</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Sinopsis:</strong> {selectedUser.sinopsis}</p>
                                <p><strong>Genero:</strong> {selectedUser.genero}</p>
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

export default Admin;