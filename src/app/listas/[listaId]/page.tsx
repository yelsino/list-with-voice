"use client";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome, IconPrint } from "@/app/components/Icons";
import { Loader } from "@/app/components/Loader/Loader";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { dateFormat, formatNameTitle, moneyFormat } from "@/interfaces/mapper";
import { useAppSelector } from "@/redux/hooks";
import {
    useGetListaByIdQuery,
    useGetListasQuery,
} from "@/redux/services/listaApi";
import Link from "next/link";
import React from "react";

interface IParams {
    listaId: string;
}

function ListasIdPage({ params }: { params: IParams }) {
    const { isLoading, isFetching, data, error } = useGetListaByIdQuery({
        id: params.listaId,
    });

    return (
        <>
            {isLoading ? (
                <Loader texto="cagando lista..." />
            ) : (
                <div className="flex flex-col gap-y-3">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <button className="w-full h-full flex items-center justify-center">
                                <IconPrint />
                            </button>
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
                                Lista {data?.pagado ? 'pagada' : 'no pagada'} {moneyFormat(data?.montoTotal)}
                            </p>
                        </SuperTitle>
                    </div>
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

export default ListasIdPage;

