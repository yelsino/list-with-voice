"use client";

import { moneyFormat } from "@/interfaces/mapper";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Header } from "../components/Header";
import { IconHome, IconSave } from "../components/Icons";
import { SuperTitle } from "../components/SuperTitle";
import Link from "next/link";
import { Loader } from "../components/Loader/Loader";

function GenerarPage() {
    const { itemsList, pagada, nombreCliente, cargando } = useAppSelector(
        (state) => state.listaReducer
    );

    return (
        <>
            {cargando ? (
                <Loader texto="registrando..." />
            ) : (
                <div className="flex flex-col gap-y-6">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <button>
                                <IconSave estilo="" />
                            </button>
                        }
                    />

                    <SuperTitle>
                        {nombreCliente ? (
                            <p className="text-2xl capitalize">{nombreCliente}</p>
                        ) : (
                            <p className=" font-bold text-2xl">
                                Lista para:
                            </p>
                        )}

                        <p className="text-secondary-200 text-lg font-semibold">
                            Pagada: {pagada ? "Si" : "No"}
                        </p>
                    </SuperTitle>

                    <p className="text-secondary-100 font-semibold text-lg ">
                        Productos
                    </p>

                    <div className="flex flex-col gap-y-4 h-[calc(100vh-320px)] pb-10 overflow-x-hidden overflow-y-scroll ">
                        {itemsList.map((item, index) => (
                            <div
                                className="text-secondary-100 flex items-center gap-x-2"
                                key={index}
                            >
                                <span className="text-secondary-200 text-xs">
                                    {index + 1}.-{" "}
                                </span>{" "}
                                <div className="w-full  flex justify-between">
                                    {item.calculated ? (
                                        <span>{item.nombre}</span>
                                    ) : (
                                        <span>
                                            {item.cantidad} {item.medida}{" "}
                                            {item.nombre}{" "}
                                            <span className="text-sm">
                                                {item.precio} x und
                                            </span>
                                        </span>
                                    )}
                                    <span>
                                        {" "}
                                        <span className="text-sm"> </span>{" "}
                                        {moneyFormat(item.montoItem)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default GenerarPage;
