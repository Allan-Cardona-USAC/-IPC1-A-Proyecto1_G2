import React, { useState } from "react";
import './Styles/EditarAdmin.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function EliminarPeliculaAdmin() {
    //Creación de los estados de la pantalla
    const [titulo, setDato] = useState('');
    //Creación de la cookie que se usará
    const [cookies, setCookie] = useCookies(['usuario']);
    // Creación del encargado de navegar entre las distintas rutas que tiene nuestro Router
    const navigate = useNavigate();

        // Este método se encarga de comunicarse con nuestro backend para validar si las credenciales son correctas.
        // Evita la recarga de nuestro sitio web
        event.preventDefault();

        const data = {
            titulo
        }


        const handleEliminarPelicula = (event) => {
            event.preventDefault();
            
            // Este método se encarga de comunicarse con el backend con un endpoint específico, en este caso /login
            fetch(`http://localhost:5000/pelicula/${titulo}`, {
                // Se especifica el tipo de método
                method: "DELETE",
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
                setDato("")
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
                                <h2 className="card-title text-center mb-4">Eliminar Película</h2>
                                
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="datoInput"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="correoelectronico@gmail.com o Star Wars: Episodio III - La venganza de los sith"
                                            onChange={(e) => setDato(e.target.value)}
                                            value={titulo}
                                        />
                                        <label htmlFor="floatingInput">Película que se desea Eliminar</label>
                                    </div>
                                    <div className="text-center">
                                         <button onClick={handleEliminarPelicula} className="btn btn-outline-danger">Eliminar Película</button> 
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

export default EliminarPeliculaAdmin;