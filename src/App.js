import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import RutaPrivada from "./components/rutas/RutaPrivada";
import tokenAuth from "./config/tokenAuth";
import AlertasState from "./context/alertas/AlertasState";
import AuthState from "./context/autenticacion/AuthState";
import ProyectoState from "./context/proyectos/ProyectoState";
import TareasState from "./context/tareas/TareasState";

// revisar si se tiene un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareasState>
        <AlertasState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta/" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos/" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertasState>
      </TareasState>
    </ProyectoState>
  );
}

export default App;
