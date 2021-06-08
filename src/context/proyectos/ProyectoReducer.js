import {
  OBTENER_PROYECTOS,
  FORMULARIO_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types/index";

const  ProyectoReducer = (state, action) =>{
  //se accede al type de la accion
  switch (action.type) {
    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        errorFormulario: false
      };
    case VALIDAR_FORMULARIO:
      return{
        ...state,
        errorFormulario: true 
      }
    case PROYECTO_ACTUAL:
      return{
        ...state,
        proyecto: state.proyectos.filter(proyecto => proyecto._id===action.payload)
      }
    case ELIMINAR_PROYECTO:
      return{
        ...state,
        proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload ),
        proyecto:null
      }
    case PROYECTO_ERROR:
      return{
        ...state,
        mensaje: action.payload
      }
    default:
      return state;
  }
};
export default ProyectoReducer;