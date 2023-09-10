"use client";

import { SuperTitle } from "@/app/components/SuperTitle";

function Negocio() {
    return (
        <div className="overflow-y-scroll h-screen pb-28">
            {" "}
            <SuperTitle>
                <p className="">
                    <span>Hola!</span>
                    <br /> <span>Configura tu negocio</span>
                    {/* <br /> <span>Voice List</span> */}
                </p>
            </SuperTitle>
            {/* contenido */}
            <form
                autoComplete="new-password"
                className="flex flex-col gap-y-4 mt-3"
            >
                <div>
                    <p className="text-secondary-100">Nombre de tienda</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="nombreUsuario"
                    />
                </div>

                {/* voucher */}
                <div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg p-5 h-full flex flex-col gap-y-2">
                        <h3 className="text-center font-bold text-3xl">YOLA</h3>
                        <p className="text-center">
                            Vienvenido a nuestro negocio de frutas y verduras al
                            por mayor y menor
                        </p>
                        <div>
                            <p>
                                <span className="font-bold">Fecha: </span>{" "}
                                <span>Martes, 15 de agosto de 2023</span>
                            </p>
                            <p>
                                <span className="font-bold">Cliente: </span>{" "}
                                <span>Sin identificar</span>
                            </p>
                        </div>

                        <div>
                            <p className="flex justify-between font-bold">
                                <span>Descripción</span> <span>Monto</span>
                            </p>
                            <div>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <p
                                        key={item}
                                        className="flex justify-between w-full"
                                    >
                                        <span>1.5kg platanos 4.2 x und</span>{" "}
                                        <span>S/ 5.50</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* QR */}
                    </div>
                </div>

                <div>
                    <p className="text-secondary-100">Texto 1</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="nombreUsuario"
                    />
                </div>
                <div>
                    <p className="text-secondary-100">Texto 2</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="nombreUsuario"
                    />
                </div>

                <div className="flex justify-center mt-5">
                    <button className="bg-secondary-100 px-5 py-3 rounded-full font-bold">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Negocio;
