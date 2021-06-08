import React from "react";
import SideBar from "../layout/SideBar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticacion/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";

const Proyectos = () => {
  // extraer info de autenticacion
  const authContext = useContext(AuthContext);
  const { UsuarioAutenticado } = authContext;

  useEffect(() => {
    UsuarioAutenticado();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid m-0">
      <Barra />
      <div className="row">
        <div className="col-lg-4 col-xl-3">
          <SideBar />
        </div>
        <div className="col-lg-8 col-xl-9">
          <main>
            <FormTarea />
            <ListadoTareas />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
