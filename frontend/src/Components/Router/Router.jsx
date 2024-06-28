import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../Login';
import Checkin from '../Checkin';
import ListaDeUsuariosA from '../ListaDeUsuariosA';
import ListaDePeliculasA from '../ListaDePeliculasA';
import AgregarAdmin from '../AgregarAdmin';
import InicioUsuario from '../InicioUsuario';
import InicioAdmin from '../InicioAdmin';
import Comentarios from '../Comentarios';
import Alquiler from '../Alquiler';
import EditarPerfil from '../EditarPerfil';
import VerComentarios from '../VerComentarios';
import EditarAdmin from '../EditarAdmin';



function Router(){
    return(
        <BrowserRouter>
            <Routes>
                {/*Creación de las distintas rutas que se tendrán (urls) y el componente que se llamará*/}
                <Route path='/' element={<Navigate to ="/login" />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/checkin' element={<Checkin/>} />
                <Route path='/ListaDeUsuariosA' element={<ListaDeUsuariosA/>} />
                <Route path='/ListaDePeliculasA' element={<ListaDePeliculasA/>} />
                <Route path='/AgregarAdmin' element={<AgregarAdmin/>} />
                <Route path='/EditarAdmin' element={<EditarAdmin/>} />
                <Route path='/InicioUsuario' element={<InicioUsuario/>} />
                <Route path='/InicioAdmin' element={<InicioAdmin/>} />
                <Route path='/Comentarios' element={<Comentarios/>} />
                <Route path='/Alquiler' element={<Alquiler/>} />
                <Route path='/EditarPerfil' element={<EditarPerfil/>} />
                <Route path='/VerComentarios' element={<VerComentarios/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;