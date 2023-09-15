"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { dateFormat, moneyFormat } from "@/interfaces/mapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetListasQuery } from "@/redux/services/listaApi";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import ListasSkeleton from "./listas.skeleton";
import SelectDate from "@/app/components/SelectDate";
import { DateType } from "react-tailwindcss-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";
import { Lista } from "@/interfaces/list.interface";
import dayjs from "dayjs";

function ListasPage() {
    const { startDate, endDate } = useAppSelector(
        (state) => state.listaReducer
    );

    const [pageNumber, setPageNumber] = useState(1);
    const [dataAcumulada, setDataAcumulada] = useState<Lista[]>([]);

    const { isLoading, isFetching, data, error } = useGetListasQuery({
        startDate: startDate as DateType,
        endDate: endDate as DateType,
        page: pageNumber,
        pageSize: 10,
    });

    function generarTextoFecha(startDateStr: any, endDateStr: any) {
        // Convertir las cadenas de texto en objetos dayjs
        const startDate = dayjs(startDateStr);
        const endDate = dayjs(endDateStr);

        const today = dayjs();
        const diffDays = endDate.diff(startDate, "day");

        if (today.isSame(startDate, "day") && today.isSame(endDate, "day")) {
            return "De hoy";
        } else if (
            diffDays === 2 ||
            (diffDays === 3 && today.isSame(endDate, "day"))
        ) {
            return "De los últimos 3 días";
        } else if (
            diffDays === 6 ||
            (diffDays === 7 && today.isSame(endDate, "day"))
        ) {
            return "De los últimos 7 días";
        } else if (
            today.isSame(startDate, "week") &&
            today.isSame(endDate, "week")
        ) {
            return "De esta semana";
        } else if (
            startDate.isSame(today.startOf("month"), "day") &&
            endDate.isSame(today.endOf("month"), "day")
        ) {
            return "De este mes";
        } else if (
            startDate.isSame(today.startOf("month"), "day") &&
            endDate.isSame(today.subtract(1, "day"))
        ) {
            return "De este mes";
        } else if (
            startDate.isSame(
                today.subtract(1, "month").startOf("month"),
                "day"
            ) &&
            endDate.isSame(today.subtract(1, "month").endOf("month"), "day")
        ) {
            return "Del mes pasado";
        } else {
            return `${startDate.format("DD-MM-YYYY")} a ${endDate.format(
                "DD-MM-YYYY"
            )}`;
        }
    }

    useEffect(() => {
        if (data) {
            setDataAcumulada((prev) =>
                Array.from(new Set([...prev, ...data.data]))
            );
        }
    }, [data, pageNumber]);

    return (
        <>
            {isLoading ? (
                <ListasSkeleton />
            ) : (
                // <Loader texto="cargando listas..." />
                <div className="flex flex-col gap-y-3">
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <Link
                                href="/listas/selectdate"
                                className="cursor-pointer"
                            >
                                <IconCalendar />
                            </Link>
                        }
                    />
                    <SuperTitle>
                        <p className="text-4xl">
                            <span>Todas</span>
                            <br /> <span>Las listas</span>
                        </p>
                        <p className="text-base font-medium text-secondary-200 break-words">
                           {generarTextoFecha(startDate, endDate)}{" "}
                            <span className="text-secondary-100">
                                {data?.cantidad ?? 0} items
                            </span>
                        </p>
                    </SuperTitle>

                    <div
                        // className="flex flex-col gap-y-4 overflow-y-scroll pb-20"
                        id="scrollableDiv"
                        className="h-[calc(100vh-320px)] overflow-y-scroll"
                    >
                        <InfiniteScroll
                            dataLength={data?.cantidad ?? 0}
                            next={() => setPageNumber(pageNumber + 1)} // Incrementa el número de página
                            hasMore={
                                dataAcumulada.length < (data?.cantidad ?? 0)
                            } // Verifica si hay más datos disponibles
                            loader={
                                <h4 className="text-secondary-200">
                                    Cargando...
                                </h4>
                            }
                            scrollableTarget="scrollableDiv"
                            className="flex flex-col gap-y-3 pb-20"
                            // endMessage={<p>NO HAY MAS DATA</p>}
                        >
                            {dataAcumulada?.map((lista, index: any) => (
                                <Link
                                    href={`/listas/${lista.id}`}
                                    className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex  rounded-lg  py-4"
                                    key={index}
                                >
                                    <div className="w-full ">
                                        <div className="flex justify-between text-lg">
                                            <span className="capitalize">
                                                {lista.nombreCliente}
                                            </span>
                                            <span>
                                                {moneyFormat(lista.montoTotal)}
                                            </span>
                                        </div>
                                        <p className="text-secondary-200 text-sm">
                                            {dateFormat(lista.createdAt)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </InfiniteScroll>

                        {dataAcumulada?.length === 0 && (
                            <Link
                                href="/generar"
                                className="text-secondary-100 flex mt-3  gap-x-2 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 "
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                                Crear lista
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ListasPage;
