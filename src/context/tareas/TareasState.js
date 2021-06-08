import React, { useReducer } from "react";
import TareasContext from "./TareasContext";
import TareasReducer from "./TareasReducer";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  VALIDAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types/index";

const TareasState = (props) => {
  const stateInicial = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };
  // useReducer
  const [state, dispatch] = useReducer(TareasReducer, stateInicial);

  const ObtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {}
  };

  const AgregarTarea = async (tarea) => {
    try {
      await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {}
  };

  const EliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {}
  };

  const ValidarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const SelectTarea = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const ActualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {}
  };

  return (
    <TareasContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        AgregarTarea,
        ObtenerTareas,
        EliminarTarea,
        ValidarTarea,
        SelectTarea,
        ActualizarTarea,
      }}
    >
      {props.children}
    </TareasContext.Provider>
  );
};
export default TareasState;
