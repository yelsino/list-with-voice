"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

function GenerarPage() {
    const {itemsList,nombreCliente} = useAppSelector((state) => state.listaReducer);
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col gap-y-6">
            <div className="">
                <p className="text-secondary-200">Lista para: </p>
                <p className="text-xl font-black font-catamaran text-text1 leading-tight text-secondary-100 ">
                    {nombreCliente ?? ""}
                </p>
            </div>
            <div className="flex flex-col gap-y-3">
                {itemsList.map((item, index: any) => (
                    <p className="text-secondary-100 " key={index}>
                        <span className="text-secondary-200 text-xs">
                            {index + 1}.-{" "}
                        </span>{" "}
                        {item.cantidad} {item.medida} {item.nombreProducto} {item.costoTotal}
                    </p>
                ))}
            </div>
            {/* <p className="text-secondary-200">Total a pagar: </p> */}
        </div>
    );
}

export default GenerarPage;
