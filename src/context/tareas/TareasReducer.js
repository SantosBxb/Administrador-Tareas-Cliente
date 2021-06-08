import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  VALIDAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,

} from "../../types/index";

const TareasReducer = (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return{
        ...state,
        tareasProyecto: action.payload
      }

    case AGREGAR_TAREA:
      return{
        ...state,
        tareasProyecto : [...state.tareasProyecto, action.payload ],
        errorTarea: false

      }
    case ELIMINAR_TAREA:
    return {
        ...state, 
        tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload._id)
      }
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true
      }
      case TAREA_ACTUAL:
        return{
          ...state,
          tareaSeleccionada: action.payload
        }
      
      case ACTUALIZAR_TAREA:
        return {
          ...state,
          tareasProyecto: state.tareasProyecto.map(tarea => (
            tarea._id === action.payload._id 
              ? action.payload
              : tarea
          )),
          tareaSeleccionada: null,
          errorTarea: false
          
        }
    default:
      return state;
  }
}
export default TareasReducer;