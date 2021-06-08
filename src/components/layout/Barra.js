import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/AuthContext";

const Baarra = () => {
  // extraer info de autenticacion
  const authContext = useContext(AuthContext);
  const {CerrarSesion, UsuarioAutenticado, usuario } = authContext;

  useEffect(() => {
    UsuarioAutenticado();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="zi p-2 border-5 border-bottom border-info rounded text-center row sticky-top bg-0 shadow">
      <div className="d-block col col-lg-4 col-xl-3 align-self-center text-center">
        <h1 className="h2">
          Administrador <span className="text-info">Tareas</span>
        </h1>
      </div>

      <nav className="col-2 col-lg-8 col-xl-9 align-self-center ">
        <div className="d-none d-lg-block ">
          {usuario ? (
            <h3 className="float-start mt-3">
              Bienvenido/a <span className="text-primary">{usuario.nombre}</span>
            </h3>
          ) : null}
          <button 
            className="btn cerrar-sesion mt-3 float-end"
            onClick={()=>CerrarSesion()}
          >
            Cerrar sesión
          </button>  
        </div>
        <div className="d-block d-lg-none align-top">
          <button
            className="btn cerrar-sesion c-s float-end"
            onClick={()=>CerrarSesion()}
          >
          Cerrar Sesión
          </button>
        </div>
      </nav>
      
    </header>
  );
};

export default Baarra;
