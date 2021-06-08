import React, { Fragment, useContext, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import Proyecto from "../../components/proyectos/Proyecto";
import AlertasContext from "../../context/alertas/AlertasContext";

const ListadoProyectos = () => {
  const proyectosContext = useContext(ProyectoContext);
  const { mensaje, proyectos, ObtenerProyectos } = proyectosContext;

  const alertasContext = useContext(AlertasContext);
  const {alerta, MostrarAlerta} = alertasContext
  // obtener los proyectos una vez cargue el componente
  useEffect(() => {
    if (mensaje){
      MostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    ObtenerProyectos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje]);

  if (proyectos.length === 0) <p>No hay Proyectos creados</p>;

  return (
    <Fragment>
      {alerta ?(
        <div
          className={`zi-alert top-50 start-50 translate-middle pt-5 text-center alert alert-${alerta.categoria}`}
        >
          <h5>{alerta.msg}</h5>
        </div>
      ) : null}
      <div className="list-group mt-5 shadow ">
        {proyectos.map((proyecto) => (
          <Proyecto key={proyecto._id} proyecto={proyecto} />
        ))}
      </div>
    </Fragment>
  );
};

export default ListadoProyectos;
