import { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext)

    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    const [proyecto, setProyecto] = useState({
        nombre: ''
    })

    const { nombre } = proyecto

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if (nombre === '') {
            mostrarError()
            return
        }

        agregarProyecto(proyecto)

        setProyecto({
            nombre: ''
        })
    }

    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>

            {formulario ?
                (
                    <form
                        className='formulario-nuevo-proyecto'
                        onSubmit={onSubmit}
                    >
                        <input
                            type="text"
                            name='nombre'
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit"
                            value="Agregar Proyecto"
                            className='btn btn-block btn-primario'
                        />
                    </form>
                )
                : null
            }

            {errorformulario ?
                (
                    <p className='mensaje error'>El nombre del proyecto es obligatorio</p>
                )
                : null
            }


        </>

    )
}

export default NuevoProyecto
