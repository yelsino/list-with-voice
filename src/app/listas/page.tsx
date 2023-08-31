"use client";
import Link from "next/link";
import React from "react";
import { moneyFormat } from "@/interfaces/mapper";
import { Header } from "../components/Header";
import { IconCalendar, IconHome } from "../components/Icons";
import { SuperTitle } from "../components/SuperTitle";
import { Loader } from "../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetListasQuery } from "@/redux/services/listaApi";
import { obtenerImagenLista } from "@/redux/chunks/listaChunk";

function ListasPage() {
    const { isLoading, isFetching, data, error } = useGetListasQuery(null);
    const dispatch = useAppDispatch();

   
    const { itemsList, pagada, nombreCliente, cargando } = useAppSelector(
        (state) => state.listaReducer
    );

    return (
        <>
            {isLoading ? (
                <Loader texto="cargando listas..." />
            ) : (
                <div className="flex flex-col gap-y-3">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <Link href="/" className="text-2xl">
                                <IconCalendar />
                            </Link>
                        }
                    />

                    <SuperTitle>
                        <p className="text-4xl">
                            <span>Todas</span>
                            <br /> <span>Las listas</span>
                        </p>
                        <p className="text-lg font-medium text-secondary-200">
                            De hoy 18 de agosto
                        </p>
                    </SuperTitle>
                       
                    <div className="flex flex-col gap-y-4">
                        
                        {data?.map((lista, index: any) => (
                            <Link
                                href={`/listas/${lista.id}`}
                                className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex justify-between items-center rounded-lg text-lg py-4"
                                key={index}
                            >
                                <span className="capitalize">
                                    {lista.nombreCliente}
                                </span>
                                <span>{moneyFormat(lista.montoTotal)}</span>
                            </Link>
                        ))}
                    ComprobanteDePago</div>
                </div>
            )}
        </>
    );
}

export default ListasPage;
