import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex h-full w-full gap-5">
      <div className="max-w-4xl bg-slate-200 p-8 rounded-md h-full">
        <img src="foto-home.png" alt="" />
        <p className="mt-10 text-xl">
          Manten tus contraseñas guardadas y organizadas en un mismo lugar,
          ahorrandote miles de dolores de cabeza.
        </p>
        <p className="mt-5 text-xl">
          Hemos desarrollado esta aplicacion para soluciones un problema muy
          comun, cuanta veces has olvidado tus contraseñas, ahora olvidate de
          ese problema
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="max-w-xl bg-slate-200 p-8 rounded-md">
          <p className="mb-10">Registrate y vive la experiencia</p>
          <Link to={"/posts"} className="border-2 border-cyan-500 p-4">
            get started
          </Link>
        </div>
        <div className="max-w-xl bg-slate-200 p-8 rounded-md">
          <img src="foto-card.png" alt="" />
          <p className="mt-10">
            con un diseño agradable y facil de usar, no se costana nada
            acostumbrarse a nuestro software
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
