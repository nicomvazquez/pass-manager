import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/PostCard.jsx";

function HomePage() {

  const post = {
    title: "bevaevfaev",
    password: "vaevaev",
    url: "veavea",
    date: "vaveav",
    id: ""
  }

  return (
    <div className="flex h-full w-full gap-5">
      <Card post={post}></Card>
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
          <p className="mb-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            tenetur sequi amet tempore
          </p>
          <Link to={"/posts"} className="border-2 border-cyan-500 p-4">
            get started
          </Link>
        </div>
        <div className="max-w-xl bg-slate-200 p-8 rounded-md">
          <img src="foto-home.png" alt="" />
          <p className="mt-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            tenetur sequi amet tempore illo totam perferendis. Ad sapiente harum
            veritatis similique dolores nisi cumque at saepe. Ullam dolor
            possimus culpa.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
