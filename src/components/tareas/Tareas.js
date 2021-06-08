import React, { useContext } from "react";
import TareasContext from "../../context/tareas/TareasContext";
import {motion} from "framer-motion";

const Tarea = ({ tarea }) => {
  const tareasContext = useContext(TareasContext);
  const {
    ActualizarTarea,
    EliminarTarea,
    ObtenerTareas,
    SelectTarea,
  } = tareasContext;
  
  const CambiarestadoTarea = (tarea) => {
    tarea.estado ? (tarea.estado = false) : (tarea.estado = true);
    ActualizarTarea(tarea);
  };

  const onClickEliminarTarea = (tarea) => {
    EliminarTarea(tarea._id, tarea.proyecto);
    ObtenerTareas(tarea.proyecto);
  };

  const onClickEditar = (tarea) => {
    SelectTarea(tarea);
  };

  return (
    <motion.li 
      animate={{ scale: 0.99 }}
      transition={{ duration: 0.5 }}
      className="row bg-hover  ">
      <div className="col-5 d-inline-flex align-items-center flex-shrink-1 ">
        <p className="">{tarea.nombre}</p>
      </div>

      <div className="col-3 centrar m-2 flex-shrink-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`btn btn-sm ${
            tarea.estado ? "btn-outline-success" : "btn-outline-warning"
          } text-center `}
          onClick={() => CambiarestadoTarea(tarea)}
        >
          {tarea.estado ? "Completada" : "Incompleta"}
        </motion.button>
      </div>

      <div className="col-3 d-flex flex-column flex-sm-row  justify-content-center flex-grow-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn btn-sm btn-outline-primary m-1"
          onClick={(e)=>onClickEditar(tarea)}
        >
          Editar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn btn-sm btn-outline-danger m-1"
          onClick={() => onClickEliminarTarea(tarea)}
        >
          Eliminar
        </motion.button>
      </div>
    </motion.li>
  );
};

export default Tarea;
