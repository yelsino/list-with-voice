"use client";
import { Header } from "@/app/components/Header";
import { IconTool, IconUsers } from "@/app/components/Icons";
import OptionsMenu from "@/app/components/Popover/Popover";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useGetCostumerQuery } from "@/redux/services/clienteApi";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import { obtenerImagenLista } from "@/redux/chunks/listaChunk";
import { dateFormat } from "@/interfaces/mapper";

interface IParams {
    clienteId: string;
}

function ClienteIdPage({ params }: { params: IParams }) {
    const { isLoading, isFetching, data, error } = useGetCostumerQuery({
        id: params.clienteId,
    });

    const { push } = useRouter();
    const dispatch = useAppDispatch();

    return (
        <>
            {isLoading ? (
                <p>CARGANDO</p>
            ) : (
                <div className="flex flex-col gap-y-4">
                    <Header
                        childrenLeft={
                            <Link href="/clientes" className="text-2xl">
                                <IconUsers estilo="w-8 h-8" />
                            </Link>
                        }
                        childrenRight={
                            <OptionsMenu
                                imprimirLista={() =>
                                    dispatch(obtenerImagenLista(data as any))
                                }
                                actualizarLista={() => {}}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <IconTool />
                                </div>
                            </OptionsMenu>
                        }
                    />

                    <SuperTitle title={formatText(data?.data.nombres ?? "")}>
                       
                        <div className="text-secondary-200 text-lg font-normal">
                            Este usuario cuenta con 10 listas
                        </div>
                    </SuperTitle>

                    <div>
                        {data?.data.listas?.map((lista, index: any) => (
                            <Link
                                href={`/listas/${lista.id}`}
                                className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex  rounded-lg  py-4 items-center gap-x-3"
                                key={index}
                            >
                                <ClipboardIcon height={28} width={28} />
                                <div className="flex flex-col">
                                    <p className="text-lg">S/. 50.00</p>
                                    <p className="capitalize">
                                        {dateFormat(lista.createdAt)}
                                    </p>
                                    <div className="text-secondary-200">
                                        <p>Pagado: si</p>
                                        <p>Adelanto: s/. 100.00</p>
                                        <button className="self-start bg-pink-500 py-1 mt-3 px-3 text-white">
                                            Ver Detalle
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default ClienteIdPage;
