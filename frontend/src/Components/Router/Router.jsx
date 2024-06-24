import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../Login';
import Checkin from '../Checkin';
import AgregarEditarAdmin from '../AgregarEditarAdmin';
import EliminarAdmin from '../EliminarAdmin';
import InicioUsuario from '../InicioUsuario';
import InicioAdmin from '../InicioAdmin';
//import Admin from '../Admin';



function Router(){
    return(
        <BrowserRouter>
            <Routes>
                {/*Creación de las distintas rutas que se tendrán (urls) y el componente que se llamará*/}
                <Route path='/' element={<Navigate to ="/login" />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/checkin' element={<Checkin/>} />
                <Route path='/AgregarEditarAdmin' element={<AgregarEditarAdmin/>} />
                <Route path='/EliminarAdmin' element={<EliminarAdmin/>} />
                <Route path='/InicioUsuario' element={<InicioUsuario/>} />
                <Route path='/InicioAdmin' element={<InicioAdmin/>} />
                {/*<Route path='/admin' element={<Admin/>} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;