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
import { obtenerImagenLista,  } from "@/redux/chunks/listaChunk";
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
        push(`/generar`);
    }

    return (
        <>
            {isLoading ? (
                <ListasIdSkeleton />
            ) : (
                <div className="flex flex-col gap-y-4">
                    <Header
                        childrenLeft={
                            <Link href="/listas" className="text-2xl">
                                <IconLists />
                            </Link>
                        }
                        childrenRight={
                            <OptionsMenu 
                                imprimirLista={()=>dispatch(obtenerImagenLista(data as any))}
                                actualizarLista={actualizarLista}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <IconTool />
                                </div>
                            </OptionsMenu>
                        }
                    />

                    <div className="">
                        <SuperTitle>
                            <p className="text-4xl">
                                {formatText(data?.nombreCliente ?? "")}
                            </p>
                            <p className="text-lg font-medium text-secondary-200">
                                {dateFormat(data?.createdAt)}
                            </p>
                            <p className="text-lg font-medium text-secondary-200">
                                Lista {data?.pagado ? "pagada" : "no pagada"}{" "}
                                <span className="text-secondary-100">
                                    {moneyFormat(data?.montoTotal)}
                                </span>
                            </p>
                        </SuperTitle>
                    </div>

                    <div>
                        <p className="text-secondary-100 font-semibold pb-2">
                            PRODUCTOS
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
