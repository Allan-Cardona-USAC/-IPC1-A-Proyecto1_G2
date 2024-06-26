import React, { useState, useEffect, Fragment } from "react";
import './Styles/InicioUsuario.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Alquiler() {
    // Se declaran los estados iniciales
    const [posts, setPosts] = useState([]);
    // Se declaran las cookies, aunque no se usen algunos, se deben poner, sino tira error y no reconoce el removeCookie 
    const [cookies, setCookie, removeCookie] = useCookies(['student']);
    const navigate = useNavigate();

    // Este método se encarga de ejecutarse cuando la página se termine de renderizar o cargar en otras palabras
    useEffect(() => {
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/getComentarios`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
                // Guardamos en un estado la respuesta que en este caso es un array de objetos json y antes de guardar el array
                // invertimos la lista
                setPosts(res.reverse());
            })
            .catch((error) => console.error(error));
    }, []);

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
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>    
                    <th scope="col">Nombre de la película</th>
                    <th scope="col">Precio Devolución</th>
                    <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Star Wars</td>
                    <td>Q50</td>
                    <td>No devuelto</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Monja 3</td>
                    <td>Q70</td>
                    <td>Devuelto</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Alquiler;