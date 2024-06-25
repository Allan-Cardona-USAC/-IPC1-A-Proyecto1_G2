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