import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import clienteAxios from "../../config/axios";
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    ERROR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA,
    TAREA_ALERTA
} from "../../types";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState)

    const obtenerTareas = async proyectoId => {
        try {
            const respuesta = await clienteAxios.get(`/api/tareas/${proyectoId}`)

            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.tareas
            })
        } catch (error) {
            console.log(error.response);

            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }
    
    const agregarTarea = async tarea => {
        //tarea.id = uuidv4()
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea)

            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
            console.log(error.response);

            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    const mostrarError = () => {
        dispatch({
            type: ERROR_TAREA
        })
    }

    const eliminarTarea = async id => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`)

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error.response);

            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    const cambiarEstadoTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            dispatch({
                type: ESTADO_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
            console.log(error.response);

            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const editarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            dispatch({
                type: EDITAR_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
            console.log(error.response);

            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                mensaje: state.mensaje,
                obtenerTareas,
                agregarTarea,
                mostrarError,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                editarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState
