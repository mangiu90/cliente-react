import { useEffect, useContext } from 'react'
import Barra from '../layout/Barra'
import Sidebar from '../layout/Sidebar'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

    // const authContext = useContext(AuthContext)
    // const { usuarioAutenticado } = authContext

    // useEffect(() => {
    //     usuarioAutenticado()
    // }, []);
    

    return (
        <div className='contenedor-app'>
            <Sidebar />

            <div className='seccion-principal'>
                <Barra />

                <main>
                    <FormTarea />

                    <div className='contenedor-tareas'>
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos
