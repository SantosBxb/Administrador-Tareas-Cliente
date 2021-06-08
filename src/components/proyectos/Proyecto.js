import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareasContext from '../../context/tareas/TareasContext';

const Proyecto = ({proyecto}) => {
  const proyectoContext = useContext(ProyectoContext);
  const {ProyectoActual} = proyectoContext;

  const tareasCcontext = useContext(TareasContext);
  const {ObtenerTareas} = tareasCcontext;

  const SeleccionarProyecto = () => {
    ProyectoActual(proyecto._id)
    ObtenerTareas(proyecto._id)
  }
  return (  
    <button 
      type="button"
      onClick={()=>SeleccionarProyecto()}
      className="list-group-item list-group-item-action list-group-item-dark"
      >
      {proyecto.nombre}
    </button>
  );
}
 
export default Proyecto;