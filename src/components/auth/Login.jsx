import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = () => {

    let navigate = useNavigate()

    const alertasContext = useContext(alertaContext)
    const { alerta, mostrarAlerta } = alertasContext

    const authContext = useContext(AuthContext)
    const { autenticado, mensaje, iniciarSesion } = authContext

    useEffect(() => {
        if (autenticado) {
            navigate('/proyectos')
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [autenticado, mensaje]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        if (password.length < 6) {
            mostrarAlerta('El password debe ser minimo de 6 caracteres', 'alerta-error')
            return
        }

        iniciarSesion({ email, password })
    }

    return (
        <div className='form-usuario'>

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>

                <form onSubmit={onSubmit}>
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
                        <input
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Iniciar Sesión'
                        />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    )
}

export default Login
