import React, { useState } from "react";
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function Login() {
    //Creación de los estados de la pantalla
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    //Creación de la cookie que se usará
    const [cookies, setCookie] = useCookies(['usuario']);
    // Creación del encargado de navegar entre las distintas rutas que tiene nuestro Router
    const navigate = useNavigate();

    // Este método se encarga de comunicarse con nuestro backend para validar si las credenciales son correctas.
    const handleSubmit = (event) => {
        // Evita la recarga de nuestro sitio web
        event.preventDefault();

        const data = {
            correo: correo,
            contraseña: contraseña
        }
        // Este método se encarga de comunicarse con el backend con un endpoint específico, en este caso /login
        fetch(`http://localhost:5000/login`, {
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
                    /*Swal.fire({
                         title: 'Login',
                         text: 'Welcome ${dataUser.nombre} ${dataUser.apellido}',
                         icon: 'success',
                         confirmButtonText: 'Ok'
                     })*/
                    // Guardamos en las cookies lo que mandó el backend
                    setCookie('usuario', dataUser);
                    console.log(dataUser.role)
                    // Validamos el rol
                    if (dataUser.correo === "kpz_m@gmail.com" && dataUser.contraseña === "654321") {
                        // Navegamos a la ruta donde se encuentra la pantalla del admin
                        navigate('/InicioAdmin')
                    } else if (dataUser.correo != "kpz_m@gmail.com" && dataUser.contraseña != "654321") {
                        // Navegamos a la ruta donde se encuentra la pantalla del usuario
                        navigate('/InicioUsuario')
                    }
                } else {
                    // Si las credenciales están mal se muestra el siguiente mensaje.
                    /*Swal.fire({
                         title: 'Error',
                         text: 'Correo y/o contraseña incorrecta',
                         icon: 'error',
                         confirmButtonText: 'Ok'
                     })*/
                }
                // Se limpian los estados
                setCorreo("")
                setContraseña("")
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
                                <h2 className="card-title text-center mb-4">Inicio de Sesión</h2>
                                <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="correoInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="correoelectronico@gmail.com"
                                            onChange={(e) => setCorreo(e.target.value)}
                                            value={correo}
                                        />
                                        <label htmlFor="floatingInput">Correo Electrónico</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingContraseña"
                                            placeholder="Contraseña"
                                            onChange={(e) => setContraseña(e.target.value)}
                                            value={contraseña}
                                        />
                                        <label htmlFor="floatingContraseña">Contraseña</label>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={() => navigate("/checkin")} className="btn btn-outline-danger">Registrarse</button>
                                        <button type="submit" className="btn btn-outline-primary btn-lg">Iniciar Sesión</button>
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

export default Login;