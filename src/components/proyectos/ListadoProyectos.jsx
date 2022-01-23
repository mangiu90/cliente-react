import { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import alertaContext from '../../context/alertas/alertaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext)
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext

    const alertasContext = useContext(alertaContext)
    const { alerta, mostrarAlerta } = alertasContext

    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
    }, [mensaje])

    if (proyectos.length === 0) return <p>No hay proyectos comienza creando uno</p>;

    return (
        <ul className='listado-proyectos'>

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos
