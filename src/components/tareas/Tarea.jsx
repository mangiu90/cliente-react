import { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({ tarea }) => {

    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { obtenerTareas, eliminarTarea, cambiarEstadoTarea, guardarTareaActual } = tareasContext

    const [proyectoActual] = proyecto

    const handleEliminar = id => {
        eliminarTarea(id)
        obtenerTareas(proyectoActual._id)
    }
    
    const handleCambiarEstado = tarea => {
        tarea.estado = !tarea.estado
        cambiarEstadoTarea(tarea)
    }

    const handleEditar = tarea => {
        guardarTareaActual(tarea)
    }

    return (
        <li className='tarea sombra'>
            <p className=''>{tarea.nombre}</p>

            <div className='estado'>
                {tarea.estado ?
                    (<button
                        type='button'
                        className='completo'
                        onClick={() => handleCambiarEstado(tarea)}
                    >
                        Completo
                    </button>)
                :
                    (<button
                        type='button'
                        className='incompleto'
                        onClick={() => handleCambiarEstado(tarea)}
                    >
                        Incompleto
                    </button>)
                }
            </div>

            <div className='acciones'>
                <button 
                    type='button'
                    className='btn btn-primario'
                    onClick={() => handleEditar(tarea)}
                >
                    Editar
                </button>

                <button 
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => handleEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    )
}

export default Tarea
