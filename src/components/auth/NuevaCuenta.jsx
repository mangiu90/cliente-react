import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = () => {

    let history = useNavigate()

    const alertasContext = useContext(alertaContext)
    const { alerta, mostrarAlerta } = alertasContext

    const authContext = useContext(AuthContext)
    const { autenticado, mensaje, registrarUsuario } = authContext

    useEffect(() => {
        if (autenticado) {
            history('/proyectos')
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [autenticado, mensaje]);
    

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        if (password.length < 6) {
            mostrarAlerta('El password debe ser minimo de 6 caracteres', 'alerta-error')
            return
        }

        if (password !== confirmPassword) {
            mostrarAlerta('Los password no son iguales', 'alerta-error')
            return
        }

        registrarUsuario({ name, email, password })
    }

    return (
        <div className='form-usuario'>

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <div className='contenedor-form sombra-dark'>
                <h1>Obtener una Cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="name">Nombre</label>

                        <input
                            id='name'
                            type="text"
                            name="name"
                            placeholder='Tu Nombre'
                            value={name}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>

                        <input
                            id='email'
                            type="email"
                            name="email"
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="password">Password</label>

                        <input
                            id='password'
                            type="password"
                            name="password"
                            placeholder='Tu password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="confirmPassword">Confirmar Password</label>

                        <input
                            id='confirmPassword'
                            type="password"
                            name="confirmPassword"
                            placeholder='Repite tu password'
                            value={confirmPassword}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <input
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Crear Cuenta'
                        />
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'>
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta
