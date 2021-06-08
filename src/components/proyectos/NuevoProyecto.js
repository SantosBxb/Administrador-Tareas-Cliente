import React, { useContext, useState } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import {motion } from "framer-motion";


const NuevoProyecto = () => {
  
  // usar context
  const proyectoContext = useContext(ProyectoContext);
  const {
    formulario,
    MostrarFormProyecto,
    AgregarProyecto,
    MostrarError,
    errorFormulario,
  } = proyectoContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });
  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  // fn que agrega nuevo proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    // validar
    if (nombre === "") {
      MostrarError();
      return;
    }
    AgregarProyecto(proyecto);

    setProyecto({ nombre: "" });
  };

  // fn para mostrar el form de crear nuevo proyecto
  const onClickForm = () => {
    MostrarFormProyecto();
  }
  return (
    <div className="card mt-2 form-proyectos shadow bg-2 border-primary border-0  border-bottom  ">
      <div className="card-body text-center">
        <h4 className="mt-2 card-title shadow  bg-1 border-1 border-bottom border-primary rounded text-center">
          Tus <span className="">Proyectos</span>
        </h4>
        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="btn bg-1 border border-dark mt-2"
          value="Nuevo Proyecto"
          onClick={onClickForm}
        ></motion.input>

        {formulario ? (
          <motion.form 
            animate={{ scale: 0.99 }}
            transition={{ duration: 1}}
            className="form mt-3" onSubmit={onSubmitProyecto}>
            <motion.input
              whileFocus={{scale:1.05}}
              className={
                errorFormulario ? "form-control is-invalid" : "form-control"
              }
              id="validacion"
              aria-describedby="errorNombre"
              type="text"
              placeholder="Nombre del proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
            />
            {errorFormulario ? (
              <p id="errorNombre" className="invalid-feedback">
                Debe ingresar un nombre de Proyecto{" "}
              </p>
            ) : null}

            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="btn mt-3 bg-1 border border-dark"
              value="Crear proyecto"
            />
            
          </motion.form>
        ) : null}
      </div>
    </div>
  );
};

export default NuevoProyecto;
