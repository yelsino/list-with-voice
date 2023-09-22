"use client";
import { Header } from "@/app/components/Header";
import {
    IconCalendar,
    IconHome,
    IconLists,
    IconPrint,
    IconTool,
} from "@/app/components/Icons";
import { ItemLista } from "@/app/components/Lista/ItemLista";
import { Loader } from "@/app/components/Loader/Loader";
import OptionsMenu from "@/app/components/Popover/Popover";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { dateFormat, formatNameTitle, moneyFormat } from "@/interfaces/mapper";
import { obtenerImagenLista } from "@/redux/chunks/listaChunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    useGetListaByIdQuery,
    useGetListasQuery,
} from "@/redux/services/listaApi";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import ListasIdSkeleton from "./lista.skeleton";
import { updateLista } from "@/redux/features/listaSlice";
import { Lista } from "@/interfaces/list.interface";
import { useRouter } from "next/navigation";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { Cliente } from "@/interfaces/client.interface";

interface IParams {
    listaId: string;
}

function ListasIdPage({ params }: { params: IParams }) {
    const { isLoading, isFetching, data, error } = useGetListaByIdQuery({
        id: params.listaId,
    });

    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const actualizarLista = () => {
        dispatch(updateLista(data as Lista));
        dispatch(seleccionarCliente(data?.cliente as Cliente));
        push(`/generar`);
    };

    return (
        <>
            {isLoading ? (
                <ListasIdSkeleton />
            ) : (
                <div className="flex flex-col gap-y-4">
                    <Header
                        childrenLeft={
                            <Link href="/listas" className="text-2xl">
                                <IconLists estilo="" />
                            </Link>
                        }
                        childrenRight={
                            <OptionsMenu
                                imprimirLista={() =>
                                    dispatch(obtenerImagenLista(data as any))
                                }
                                actualizarLista={actualizarLista}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <IconTool />
                                </div>
                            </OptionsMenu>
                        }
                    />

                    <SuperTitle title={formatText(data?.cliente.nombres ?? "")}>
                        <div className="text-lg text-secondary-200">
                            <p className="capitalize">{dateFormat(data?.createdAt)}</p>
                            <p>Lista pagada: No</p>
                            <p>Adelanto: S/. 100.00</p>
                        </div>
                    </SuperTitle>

                    <div>
                        <p className="font-semibold pb-2 text-secondary-200 uppercase">
                            <span className="text-secondary-100">
                                S/. 64.00 {" "}
                            </span>
                            10 Productos{" "}
                        </p>
                        <div className="flex flex-col gap-y-4 h-[calc(100vh-320px)] pb-32 overflow-x-hidden overflow-y-scroll">
                            {data?.items.map((item, index) => (
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
                                                <span className="text-sm text-secondary-200">
                                                    {item.precio} x und
                                                </span>
                                            </span>
                                        )}
                                        <span>
                                            {" "}
                                            <span className="text-sm">
                                                {" "}
                                            </span>{" "}
                                            {moneyFormat(item.montoItem)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListasIdPage;
