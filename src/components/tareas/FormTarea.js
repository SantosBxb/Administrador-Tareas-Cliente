import React, { useContext, useEffect, useState } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareasContext from "../../context/tareas/TareasContext";
import { motion } from "framer-motion";

const FormTarea = () => {
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  const tareasContext = useContext(TareasContext);
  const {
    tareaSeleccionada,
    errorTarea,
    ObtenerTareas,
    AgregarTarea,
    ValidarTarea,
    ActualizarTarea,
  } = tareasContext;

  useEffect(() => {
    if (tareaSeleccionada) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({ nombre: "" });
    }
  }, [tareaSeleccionada]);

  const [tarea, setTarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;

  const OnchangeForm = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  if (!proyecto) return null;
  const [proyectoActual] = proyecto;

  const onSubmitForm = (e) => {
    e.preventDefault();
    // validar
    if (nombre.trim() === "") {
      ValidarTarea();
      return;
    }

    // determinar si es edicoin o nueva tarea
    if (!tareaSeleccionada) {
      tarea.proyecto = proyectoActual._id;
      AgregarTarea(tarea);
    } else {
      ActualizarTarea(tarea);
    }

    //obtenner tareas actualizadas
    ObtenerTareas(proyectoActual._id);

    setTarea({ nombre: "" });
  };
  return (
    <div className="row mt-3 text-center">
      <div className="col-lg-2  "></div>

      <div className="col-lg-8 ">
        <motion.h2 animate={{scale:0.9 }} 
          transition={{ ease: "easeOut", duration: 1 }}
          className="pb-2 h1">
          {proyecto[0].nombre}{" "}
        </motion.h2>
        <form className="form" onSubmit={onSubmitForm}>
          <motion.input
            whileFocus={{scale:1.05}}
            type="text"
            className={
              errorTarea
                ? "form-control is-invalid text-center"
                : "form-control text-center"
            }
            describedby="errorTarea"
            placeholder="Nombre de Tarea"
            name="nombre"
            value={nombre}
            onChange={OnchangeForm}
          />
          {errorTarea ? (
            <p id="errorTarea" className="invalid-feedback">
              Debe ingresar el nombre de la tarea
            </p>
          ) : null}

          <motion.input
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1}}
            type="submit"
            className="btn btn-lg w-100 mt-3 bg-1 border border-dark"
            value={tareaSeleccionada ? "Actualizar Tarea" : "Crear Tarea"}
          />
        </form>
      </div>

      <div className="col-lg-2"></div>
    </div>
  );
};

export default FormTarea;
