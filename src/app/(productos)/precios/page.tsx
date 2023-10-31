import React from "react";

function PreciosPage() {
  return (
    <>
      <h2 className="text-2xl  text-secondary-100 font-black  ">
        Precios productos
      </h2>

      <details open>
        <summary className="select-none">Verduras</summary>
        <div className="ml-4">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </div>
      </details>

      <details open>
        <summary className="select-none">Tuberculos</summary>
        <div className="ml-4">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </div>
      </details>

      <details open>
        <summary className="select-none">Frutas</summary>
        <div className="ml-4">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </div>
      </details>
    </>
  );
}

export default PreciosPage;
