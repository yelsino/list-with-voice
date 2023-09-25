"use client";

import getCurrentUser from "@/actions/getCurrentUser";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { Tienda } from "@/interfaces/user.interface";
import { actualizarNegocio } from "@/redux/chunks/negocioChunck";
import { useAppDispatch } from "@/redux/hooks";
import { sign } from "crypto";
import { getSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Negocio() {
    const dispatch = useAppDispatch();

    const [tienda, setTienda] = useState<Tienda | null>(null);

    const handleSubmit = (tienda: Tienda | null) => {
        if (!tienda) return;
        toast
            .promise(actualizarNegocio(tienda), {
                loading: "Actualizando...",
                error: "Error al actualizar",
                success: "Acutalización completa",
            })
            .then((res) => {
                if (res.status === 200) {
                    signOut();
                }
            });
    };

    useEffect(() => {
        getSession().then((res: any) => {
            setTienda(res?.user.tienda);
        });
    }, []);

    return (
        <div className=" pb-28 py-5">
            {" "}
            <SuperTitle title={formatText("Configuración Datos  de negocio")}>
                {null}
            </SuperTitle>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(tienda);
                }}
                autoComplete="new-password"
                className="flex flex-col gap-y-4 mt-3"
            >
                <div>
                    <p className="text-secondary-100">Nombre de tienda</p>
                    <input
                        value={tienda?.nombreTienda}
                        onChange={(e) =>
                            setTienda((prev: any) => ({
                                ...prev,
                                nombreTienda: e.target.value,
                            }))
                        }
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="nombreTienda"
                    />
                </div>

                {/* voucher */}
                <div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg p-5 h-full flex flex-col gap-y-2  ">
                        <h3 className="text-center font-bold text-3xl uppercase">
                            {tienda?.nombreTienda}
                        </h3>
                        <p className="truncate text-clip p-0 m-0 text-center">
                            {tienda?.texto1}
                        </p>
                        <p className="truncate text-clip -translate-y-3 text-center">
                            {tienda?.texto2}
                        </p>
                        <div className="-translate-y-3">
                            <p>
                                <span className="font-bold">Fecha: </span>{" "}
                                <span>Martes, 15 de agosto de 2023</span>
                            </p>
                            <p>
                                <span className="font-bold">Cliente: </span>{" "}
                                <span>Sin identificar</span>
                            </p>
                        </div>

                        <div className="-translate-y-3">
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
                        value={tienda?.texto1}
                        onChange={(e) =>
                            setTienda((prev: any) => ({
                                ...prev,
                                texto1: e.target.value,
                            }))
                        }
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="texto1"
                    />
                </div>
                <div>
                    <p className="text-secondary-100">Texto 2</p>
                    <input
                        value={tienda?.texto2}
                        onChange={(e) =>
                            setTienda((prev: any) => ({
                                ...prev,
                                texto2: e.target.value,
                            }))
                        }
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="texto2"
                    />
                </div>

                <div className="flex justify-center mt-5">
                    <button
                        type="submit"
                        className="bg-secondary-100 px-5 py-3 rounded-full font-bold"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Negocio;
