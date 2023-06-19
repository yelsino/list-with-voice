"use client";
import { useGetListasQuery } from "@/redux/services/listaApi";
import Link from "next/link";
import React from "react";
import SelectDate from "../components/SelectDate";

function ListasPage() {
    const { isLoading, isFetching, data, error } = useGetListasQuery(null);
    return (
        <div className="flex flex-col gap-y-3">
            <p className="text-xl font-black font-catamaran text-text1 leading-tight text-secondary-100 ">
                Todas las listas
            </p>

            <SelectDate />

            <div className="flex flex-col gap-y-4">
                {data?.map((lista, index: any) => (
                    <Link
                        href={`/listas/${lista.id}`}
                        className="text-secondary-100 bg-primary-100 py-2 px-3 cursor-pointer flex justify-between items-center rounded-sm"
                        key={index}
                    >
                        <span>Juan vilcapoma </span>
                        <span className="text-sm">S/. 200.00</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ListasPage;
