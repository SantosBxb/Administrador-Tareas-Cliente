import React, { useReducer } from "react";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/index";
import AlertasReducer from "./AlertasReducer";
import AlertasContext from "./AlertasContext";

const AlertasState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(AlertasReducer, initialState);

  // fn
  const MostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    // Después de 3 segundos limpiar la alerta
    setTimeout(() => {
      dispatch({
          type: OCULTAR_ALERTA
      })
    }, 3000);
  }

  return (
    <AlertasContext.Provider
      value={{
        alerta: state.alerta,
        MostrarAlerta,
      }}
    >
      {props.children}
    </AlertasContext.Provider>
  );
};
export default AlertasState;
