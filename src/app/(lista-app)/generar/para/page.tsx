"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { dateFormat, moneyFormat } from "@/interfaces/mapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SuperTitle } from "@/app/components/SuperTitle";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { useRouter } from "next/navigation";

function ParaPage() {
    const dispatch = useAppDispatch();
    const { clientes } = useAppSelector((state) => state.clienteReducer);
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col gap-y-3">
                <SuperTitle>
                    <p className="text-4xl">
                        <span>
                            Selección de <br /> clientes similares{" "}
                        </span>
                    </p>
                    <p className="text-base font-normal  text-secondary-200 break-words">
                        Se encontraron algúnas coincidencias, debes seleccionar
                        al cliente que te refieres
                    </p>
                </SuperTitle>

                <div className="h-[calc(100vh-320px)] overflow-y-scroll flex flex-col gap-y-4 mt-3 pb-20 ">
                    {clientes?.map((cliente, index: any) => (
                        <div
                            onClick={() => {
                                dispatch(
                                    seleccionarCliente({
                                        ...cliente,
                                        status: "sent",
                                    })
                                );
                                router.back();
                            }}
                            className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex  rounded-lg  py-4"
                            key={index}
                        >
                            <div className="w-full ">
                                <div className="flex justify-between text-lg">
                                    <span className="capitalize">
                                        {cliente.nombres}
                                    </span>
                                    <span></span>
                                </div>
                                <p className="text-secondary-200 text-sm">
                                    celular: {cliente.celular}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ParaPage;
