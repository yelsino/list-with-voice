"use client";
import {
    useGetListaByIdQuery,
    useGetListasQuery,
} from "@/redux/services/listaApi";
import React from "react";

interface IParams {
    listaId: string;
}

function ListasIdPage({ params }: { params: IParams }) {
    const { isLoading, isFetching, data, error } = useGetListaByIdQuery({
        id: params.listaId,
    });
    return (
        <div>
            <div className="pb-3">
                <p className="text-xl font-black font-catamaran text-text1 leading-tight text-secondary-100 pb-3">
                    {"Juan Alverto Quiñonez"}
                </p>
                <div className="text-secondary-200">
                    <p>Fecha:</p>
                    <p>Monto total:</p>
                    <p>Cantidad Productos:</p>
                    <p>Pagado:</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                {data?.items.map((items, index: any) => (
                    <p
                        className="text-secondary-100 "
                        key={index}
                    >
                       <span className="text-secondary-200 text-xs">{index +1}.-  </span> {items}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ListasIdPage;
