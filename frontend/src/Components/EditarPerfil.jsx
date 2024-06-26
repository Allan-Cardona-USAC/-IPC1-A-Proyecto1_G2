import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditarPerfil() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState('');
    const [contraseña, setContrasenia] = useState('');
    const [fecha, setFecha] = useState('');

    const navigate = useNavigate();

    // Este método se encarga de hacer logout
    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
    };

    const handleSubmit = (event) => {
        // Evita la recarga de nuestro sitio web
        event.preventDefault();

        const data = {
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            correo: correo,
            contraseña: contraseña,
            fecha: fecha
        }
        // Este método se encarga de comunicarse con el backend con un endpoint específico, en este caso /login
        fetch(`http://localhost:5000/usuarios/registro`, {
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
                alert(res.response)
                // Se limpian los estados
                setNombre("")
                setApellido("")
                setGenero("")
                setContrasenia("")
                setFecha("")
            })
            .catch((error) => console.error(error));
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
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Editar Perfil</h2>
                                <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="floatingInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Gabriel Armando"
                                            onChange={(e) => setNombre(e.target.value)}
                                            value={nombre}
                                        />
                                        <label htmlFor="floatingInput">Nombre/s</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="floatingInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Mora Quintero"
                                            onChange={(e) => setApellido(e.target.value)}
                                            value={apellido}
                                        />
                                        <label htmlFor="floatingInput">Apellido/s</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="floatingInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Hombre"
                                            onChange={(e) => setGenero(e.target.value)}
                                            value={genero}
                                        />
                                        <label htmlFor="floatingInput">Género</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }} >
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingContrasenia"
                                            placeholder="Contraseña"
                                            onChange={(e) => setContrasenia(e.target.value)}
                                            value={contraseña}
                                        />
                                        <label htmlFor="floatingContrasenia">Contraseña</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="floatingInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="18/04/1996"
                                            onChange={(e) => setFecha(e.target.value)}
                                            value={fecha}
                                        />
                                        <label htmlFor="floatingContrasenia">Fecha de nacimiento</label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-danger">Guardar Datos</button>
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

export default EditarPerfil;