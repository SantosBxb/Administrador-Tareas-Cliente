import React, {useEffect, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/AuthContext';

const RutaPrivada = ({component:Component, ...props}) => {
  const authContext = useContext(AuthContext);
  const {autenticado, UsuarioAutenticado, cargando} = authContext;
  // para que el recargar la pagina no se pierda la autenticacion
  useEffect(() => {
    UsuarioAutenticado();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Route {...props} render={props => !autenticado && !cargando? (
      <Redirect to='/'/>
    ) : (
      <Component {...props}/>
    ) }/>
  )
}
export default RutaPrivada;