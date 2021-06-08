import React from "react";
import ListadoProyectos from "../proyectos/ListadoProyectos";
import NuevoProyecto from "../proyectos/NuevoProyecto";

const SideBar = () => {
  return (
    <aside className="card bg-3 ">
      <div className="card-body">
        <NuevoProyecto />
        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default SideBar;
