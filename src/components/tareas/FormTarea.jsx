import { useContext, useEffect, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { errortarea, tareaseleccionada, obtenerTareas, agregarTarea, mostrarError, editarTarea } = tareasContext

    useEffect(() => {
        if (tareaseleccionada !== null) {
            setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    const [tarea, setTarea] = useState({
        nombre: ''
    })
    const { nombre } = tarea

    if (!proyecto) return null

    const [proyectoActual] = proyecto

    const onChangeTarea = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if (nombre.trim() === '') {
            mostrarError()
            return
        }

        if (tareaseleccionada === null) {
            agregarTarea({
                nombre: nombre,
                estado: false, 
                proyectoId: proyectoActual._id 
            })
        } else {
            editarTarea(tarea)
        }

        obtenerTareas(proyectoActual._id)

        setTarea({
            nombre: ''
        })
    }

    return (
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input
                        type="text"
                        name='nombre'
                        className='input-text'
                        placeholder='Nombre Tarea'
                        value={nombre}
                        onChange={onChangeTarea}
                    />
                </div>

                <div className='contenedor-input'>
                    <input
                        type="submit"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                        className='btn btn-primario btn-submit btn-block'
                    />
                </div>
            </form>

            {errortarea ?
                (
                    <p className='mensaje error'>El nombre de la tarea es obligatorio</p>
                )
                : null
            }
        </div>
    )
}

export default FormTarea
