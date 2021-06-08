import React, { useContext } from 'react'
import TareasContext from '../../context/tareas/TareasContext';
import Tarea from './Tareas';
import { Fragment } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import {motion} from "framer-motion";

const ListadoTareas = () => {
  const tareasContext = useContext(TareasContext);
  const {tareasProyecto } = tareasContext;
  
  const proyectoContext = useContext(ProyectoContext);
  const {EliminarProyecto, proyecto} = proyectoContext;
  
  const OnclickEliminar = () => {
    EliminarProyecto(proyecto[0]._id);
  }
  if (!proyecto) return <p className="text-center h3 mt-3 alert-secodary p-5 border rounded-3">Seleccione un proyecto </p>;
  
  return (  
    <Fragment>
      <motion.div 
        animate={{ scale: 0.99 }}
        transition={{ duration: 0.5 }}
        className="mt-5 shadow m-0 ">
        <ul className="list-group list-group-flush bg-3 fw-bold">
          {tareasProyecto.length === 0 
            ? <p className='text-center mt-3'>No existen tareas para este proyecto</p>  
            :
            <Fragment>
              {tareasProyecto.map(tarea => (
              <Tarea key={tarea._id} tarea={tarea}/>
              ))}
            </Fragment>
          }
        </ul>
      </motion.div>
      <motion.button 
        whileHover={{scale:1.05}}
        onClick={OnclickEliminar} 
        className="btn btn-outline-danger m-3 ">
        ×Eliminar Proyecto
      </motion.button>
    </Fragment>
  );
}
 
export default ListadoTareas;