import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'

const Barra = () => {
    let navigate = useNavigate()

    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext

    // useEffect(() => {
    //     usuarioAutenticado()
    // }, []);

    const handleCerrarSesion = () => {
        cerrarSesion()
        navigate('/')
    };
    
    return (
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>{usuario ? usuario.name : ''}</span></p>

            <nav className="nav-principal">
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => handleCerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
    )
}

export default Barra
