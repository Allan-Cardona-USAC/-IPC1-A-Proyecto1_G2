import React, { useState } from "react";
import './Styles/InicioAdmin.css';
import agregareditar from './Images/agregareditar.png'
import eliminar from './Images/eliminar.jpg'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function InicioAdmin() {
    //Creación de la cookie que se usará
    const [cookies, setCookie] = useCookies(['usuario']);
    // Creación del encargado de navegar entre las distintas rutas que tiene nuestro Router
    const navigate = useNavigate();


    return (

        <div className="login-backgroundD d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-3 mb-6">
                        <div className="card">
                            <img src={agregareditar} className="card-img-top" alt="Agregar o Editar una Película" />
                            <div className="card-body">
                                <h4 className="card-title">Agregar o Editar una Película</h4>
                                <p className="card-text">Aquí es dónde se pueden agregar o editar una película</p>
                                <button onClick={() => navigate("/AgregarEditarAdmin")} className="btn btn-outline-danger">Ir Agregar</button>
                                <button onClick={() => navigate("/EditarAdmin")} className="btn btn-outline-danger">Ir Actualizar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-6">
                        <div className="card">
                            <img src={eliminar} className="card-img-top" alt="Eliminar un Usuario o Película" />
                            <div className="card-body">
                                <h4 className="card-title">Eliminar un Usuario o Película</h4>
                                <p className="card-text">Aquí es dónde se puede eliminar un usuario o una película</p>
                                <button onClick={() => navigate("/EliminarAdmin")} className="btn btn-outline-danger">Ir Eliminar Usuario</button>
                                <button onClick={() => navigate("/EliminarPeliculaAdmin")} className="btn btn-outline-danger">Ir Eliminar Pelicula</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-md-3">
                        <button onClick={() => navigate("/login")} className="btn btn-danger w-100">Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>

        
    );
}

export default InicioAdmin;