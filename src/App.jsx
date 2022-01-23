import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import RutaPrivada from "./components/rutas/RutaPrivada";

import ProyectoState from './context/proyectos/ProyectoState'
import TareaState from "./context/tareas/TareaState";
import AlertaState from "./context/alertas/AlertaState";
import AuthState from "./context/autenticacion/AuthState";
import tokenAuth from "./config/tokenAuth";

const token = localStorage.getItem('token')
if (token) {
  tokenAuth(token)
}

function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="nueva-cuenta" element={<NuevaCuenta />} />
                <Route exact path="/proyectos" element={
                  <RutaPrivada>
                    <Proyectos />
                  </RutaPrivada>
                } />
              </Routes>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  )
}

export default App
