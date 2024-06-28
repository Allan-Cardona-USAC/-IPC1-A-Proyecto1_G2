import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Styles/ListaPeliculas.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function EditarPeliculasAdmin() {

     // Se declaran los estados iniciales
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [validarActualizacion, setValidarActualizacion] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/usuarios/peliculas/catalogo`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setUsers(res);
            })
            .catch((error) => console.error(error));
    }, [validarActualizacion]);

    const updateUser = (titulo) => {
        fetch(`http://localhost:5000/admin/pelicula/${titulo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedUser)
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                Swal.fire({
                    title: 'Pelicula Actualizada',
                    text: `Pelicula ha sido actualizada`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setValidarActualizacion(() => !validarActualizacion);
                setSelectedUser(null);
            })
            .catch(error => console.error("Error al actualizar la película:", error));
            Swal.fire({
                title: 'Pelicula Actualizada',
                text: `Pelicula ha sido actualizada`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setValidarActualizacion(() => !validarActualizacion);
            setSelectedUser(null);
    };

    const viewUser = (user) => {
        setSelectedUser(user);
    };

    const handleClose = () => {
        setSelectedUser(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
    };

    return (
        <Fragment>
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#212529", flexDirection: "row-reverse", paddingRight: "5%", position: "fixed" }}>
                <button className="btn btn-outline-info" onClick={() => navigate("/InicioAdmin")}>
                    Volver al Inicio
                </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", height: "90vh", width: "100%", top: "10" }}>
                <div className="table-containerLP">
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
                                        <button className="btn btn-outline-success" onClick={() => viewUser(user)}>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedUser && (
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Actualizar Película</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="form-group">
                                        <label>Titulo</label>
                                        <input type="text" className="form-control" name="titulo" value={selectedUser.titulo}  onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Sinopsis</label>
                                        <input type="text" className="form-control" name="sinopsis" value={selectedUser.sinopsis} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio</label>
                                        <input type="text" className="form-control" name="precio" value={selectedUser.precio} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Director</label>
                                        <input type="text" className="form-control" name="director" value={selectedUser.director} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Año Estreno</label>
                                        <input type="text" className="form-control" name="estreno" value={selectedUser.estreno} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Duracion</label>
                                        <input type="text" className="form-control" name="duracion" value={selectedUser.duracion} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Género</label>
                                        <input type="text" className="form-control" name="genero" value={selectedUser.genero} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Imagen</label>
                                        <input type="text" className="form-control" name="imagen" value={selectedUser.imagen} onChange={handleChange} />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                                <Button variant="primary" onClick={() => updateUser(selectedUser.titulo)}>
                                    Actualizar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </div>
        </Fragment>
    );
    /* const [titulo, setTitulo] = useState('');
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
    ); */
}

export default EditarPeliculasAdmin;
