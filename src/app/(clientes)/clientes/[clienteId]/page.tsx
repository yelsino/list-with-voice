"use client";
import { Header } from "@/app/components/Header";
import {
    IconCalendar,
    IconHome,
    IconLists,
    IconPrint,
    IconTool,
    IconUsers,
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
import { updateLista } from "@/redux/features/listaSlice";
import { Lista } from "@/interfaces/list.interface";
import { useRouter } from "next/navigation";
import { useGetCostumerQuery } from "@/redux/services/clienteApi";

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

                    <h1 className="text-secondary-100">{data?.data.nombres}</h1>

                    <pre className="text-secondary-100">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </>
    );
}

export default ClienteIdPage;
