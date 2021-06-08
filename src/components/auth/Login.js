import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertasContext from "../../context/alertas/AlertasContext";
import AuthContext from "../../context/autenticacion/AuthContext";

const Login = (props) => {
  // useContext
  const alertasContext = useContext(AlertasContext);
  const { alerta, MostrarAlerta } = alertasContext;

  const authContext = useContext(AuthContext);
  const { IniciarSesion, mensaje, autenticado } = authContext;

  // useEffecct, en caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      MostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history]);

  // state usuario
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  // desestructurar usuario
  let { email, password } = usuario;

  //fn onChange, captura datos form
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validar campos vacios
    if (email.trim() === "" || password.trim() === "") {
      MostrarAlerta("Todos los campos son obligatorios", "danger");
      return;
    }

    // pasarlo al action
    email = email.toLowerCase();
    IniciarSesion({ email, password });
  };

  return (
    <div className="row g-0 align-content-center">
      <div className="col-lg-4"></div>
      <div className="col-lg-4 zi">
        {alerta ? (
          <div
            className={` zi-alert top-50 start-50 translate-middle pt-5 text-center alert alert-${alerta.categoria}`}
          >
            <h5>{alerta.msg}</h5>
          </div>
        ) : null}
        <div className="card bg-2 pb-2 shadow border-0 rounded-5 mt-4 zi-content">
          <h1 className="text-center mt-5 card-title">Bienvenido</h1>
          <form onSubmit={onSubmit} className="card-body form">
            <label className="form-label mt-5" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="ejemplo@email.com"
              onChange={onChange}
              value={email}
            />
            <label className="form-label mt-3" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control "
              id="password"
              name="password"
              placeholder="********"
              onChange={onChange}
              value={password}
            />

            <div className="d-grid mt-4 ">
              <input
                type="submit"
                className="btn btn-primary"
                value="Iniciar Sesión"
              />
              <div className="form-text">
                ¿Aún no tienes una cuenta?{" "}
                <Link to={"/nueva-cuenta/"}>Crear Cuenta</Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="col-lg-4"></div>
    </div>
  );
};

export default Login;
