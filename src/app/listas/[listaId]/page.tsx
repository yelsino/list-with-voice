"use client";
import { Header } from "@/app/components/Header";
import {
    IconCalendar,
    IconHome,
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

interface IParams {
    listaId: string;
}

function ListasIdPage({ params }: { params: IParams }) {

    const dispatch = useAppDispatch();
    const { isLoading, isFetching, data, error } = useGetListaByIdQuery({
        id: params.listaId,
    });
    const deteleItem = (item: any) => {
        // dispatch(deleteItem(item));
    };

    const imprimirLista = () => {
        dispatch(obtenerImagenLista(data as any));
       
    };



    return (
        <>
            {isLoading ? (
                <Loader texto="cagando lista..." />
            ) : (
                <div className="flex flex-col gap-y-4">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <OptionsMenu imprimirLista={imprimirLista}>
                                <button className="w-full h-full flex items-center justify-center">
                                    <IconTool />
                                </button>
                            </OptionsMenu>
                        }
                    />

                    <div className="text-secondary-100 bg-primary-100">
                        <a href="http://localhost:3000/25bd4d7a-5ce2-4050-af50-2d24a52edc0b" download="archivo.png" >DESCARGAR</a>
                    </div>

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
                        <div className="flex flex-col gap-y-4 h-[calc(100vh-320px)] pb-10 overflow-x-hidden overflow-y-scroll">
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
