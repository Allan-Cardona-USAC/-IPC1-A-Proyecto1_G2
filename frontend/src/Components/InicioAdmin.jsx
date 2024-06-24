import React, { useState } from "react";
import './Styles/InicioAdmin.css';
import agregareditar from './Images/agregareditar.png'
import eliminar from './Images/eliminar.jpg'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function InicioAdmin() {
    //Creación de los estados de la pantalla
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
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
            contrasenia: contrasenia
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
                setCorreo("")
                setContrasenia("")
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="login-background">
            <div className="container-fluid h-100">
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    <div class="col">
                        <div className="card">
                            <img src={agregareditar} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h4 className="card-title">Agregar o Editar una Película</h4>
                                    <p className="card-text">Aquí es dónde se pueden agregar o editar una película</p>
                                    <button onClick={() => navigate("/AgregarEditarAdmin")} className="btn btn-outline-danger">Ir a la Página</button>
                                </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="card">
                            <img src={eliminar} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h4 className="card-title">Eliminar un Usuario o Película</h4>
                                    <p className="card-text">Aquí es dónde se puede eliminar un usuario o una película</p>
                                    <button onClick={() => navigate("/EliminarAdmin")} className="btn btn-outline-danger">Ir a la Página</button>
                                </div>
                        </div>
                    </div>
                    <div/>
                </div>
            </div>
        </div>
    );
}

export default InicioAdmin;