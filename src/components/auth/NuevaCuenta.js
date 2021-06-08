import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertasContext from "../../context/alertas/AlertasContext";
import AuthContext from "../../context/autenticacion/AuthContext";



const NuevaCuenta = (props) => {
  // useContext
  const alertasContext = useContext(AlertasContext);
  const { alerta, MostrarAlerta } = alertasContext;

  const authContext = useContext(AuthContext);
  const {RegistrarUsuario, mensaje, autenticado} = authContext;

  // en caso de que el usuario se haya autenticado o registrado o sea un registro duplicado 
  useEffect(() => {
    // una vez el usuario este autenticado, redirigir a proyectos
    if(autenticado){
      props.history.push('/proyectos')
    }
    if(mensaje){
      MostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history ])

  //state
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario;

  //fn onChange, captura datos form
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar que no haya cambios vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      MostrarAlerta("Todos los campos son obligatorios", "danger");
      return;
    }

    // validar password minimo largo 6
    if (password.length < 6) {
      MostrarAlerta("La contraseña debe tener mínimo 6 caracteres", "danger");
      return;
    }

    // password iguales 
    if (password !== confirmar ){
      MostrarAlerta("Las contraseñas no coinciden", "danger");
      return;
    }

    // pasarlo al action 
    email.email = email.email.toLowerCase();
    RegistrarUsuario({nombre, email, password})
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
        <div className="card bg-2 pb-2 shadow border-0 rounded-5 mt-4 zi-content ">
          <h1 className="text-center card-title m-0 mt-3 ">Bienvenido</h1>
          <form onSubmit={onSubmit} className="card-body pt-0 form">
            <label className="form-label mt-1" htmlFor="nombre">
              Ingrese su Nombre
            </label>
            <input
              type="name"
              className="form-control"
              id="nombre"
              name="nombre"
              placeholder="Juan Peréz"
              onChange={onChange}
              value={nombre}
            />

            <label className="form-label mt-3" htmlFor="email">
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
            <label className="form-label mt-3" htmlFor="confirmar">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control "
              id="confirmar"
              name="confirmar"
              placeholder="********"
              onChange={onChange}
              value={confirmar}
            />
            <div className="d-grid mt-4 ">
              <input
                type="submit"
                className="btn btn-primary"
                value="Registrar"
              />
              <div className="form-text mt-2 text-center">
                ¿Ya tienes una cuenta? <Link to={"/"}>Iniciar Sesión</Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="col-lg-4"></div>
    </div>
  );
};

export default NuevaCuenta;
