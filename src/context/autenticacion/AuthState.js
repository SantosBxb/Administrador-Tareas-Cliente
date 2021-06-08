import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_USUARIO,
} from "../../types/index";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // fn
  const RegistrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      // Obtener el usuario
      UsuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "danger",
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  // retorna usuario autenticado
  const UsuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    // pasar el token por header
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // cuando el usuario inicia sesion
  const IniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      // console.log(respuesta);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      // obtener usuario
      UsuarioAutenticado();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "danger",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  // cierra sesion usuario 
  const CerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        RegistrarUsuario,
        IniciarSesion,
        UsuarioAutenticado,
        CerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
