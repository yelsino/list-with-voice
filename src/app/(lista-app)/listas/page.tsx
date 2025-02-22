"use client";
import { Lista } from "@/interfaces/list.interface";
import { dateFormat, moneyFormat } from "@/interfaces/mapper";
import { useAppSelector } from "@/redux/hooks";
import { useGetListasQuery } from "@/redux/services/listaApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DateType } from "react-tailwindcss-datepicker";
import HederListas from "./HederListas";
import ListasSkeleton from "./listas.skeleton";

function ListasPage() {
    const { searchParams } = useAppSelector((state) => state.globalReducer);
    const { cliente } = useAppSelector((state) => state.clienteReducer);

    const [pageNumber, setPageNumber] = useState(1);
    const [dataAcumulada, setDataAcumulada] = useState<Lista[]>([]);

    const { data, isFetching, isLoading } = useGetListasQuery({
        startDate: searchParams.startDate as DateType,
        endDate: searchParams.endDate as DateType,
        page: pageNumber,
        pageSize: 10,
        texto: cliente?.nombres ?? "",
    });

    useEffect(() => {
        if (data) {
            setDataAcumulada((prev) =>
                Array.from(new Set([...prev, ...data.data]))
            );
        }
    }, [data, pageNumber]);

    return (
        <>
            <HederListas/>
            <div
                id="scrollableDiv"
                className="h-[calc(100vh-200px)] overflow-y-scroll mt-3"
            >
                {!isFetching && dataAcumulada?.length === 0 && (
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
                <InfiniteScroll
                    dataLength={data?.cantidad ?? 0}
                    next={() => setPageNumber(pageNumber + 1)}
                    hasMore={isFetching}
                    loader={
                        <ListasSkeleton/>
                    }
                    scrollableTarget="scrollableDiv"
                    className="flex flex-col gap-y-3 pb-20 "
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
                                        {lista.cliente?.nombres ?? ""}
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
            </div>

        </>
    );
}

export default ListasPage;
