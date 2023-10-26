"use client";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import { generarTextoFecha } from "@/app/utils/front.global.utils";
import { formatText } from "@/interfaces/FormatReact";
import { Cliente } from "@/interfaces/client.interface";
import { useAppSelector } from "@/redux/hooks";
import { useGetCostumersQuery } from "@/redux/services/clienteApi";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DateType } from "react-tailwindcss-datepicker";

function ClientesPage() {
    const { searchParams } = useAppSelector((state) => state.globalReducer);

    const [pageNumber, setPageNumber] = useState(1);
    const [dataAcumulada, setDataAcumulada] = useState<Cliente[]>([]);
    const { cliente } = useAppSelector((state) => state.clienteReducer);

    const { data, isFetching } = useGetCostumersQuery({
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
            {false ? (
                <p>CARGANDO...</p>
            ) : (
                // <Loader texto="cargando listas..." />
                <>
                    <Header
                        childrenLeft={
                            <Link href="/" className="text-2xl">
                                <IconHome />
                            </Link>
                        }
                        childrenRight={
                            <Link href="/filtrar" className="cursor-pointer">
                                <IconCalendar />
                            </Link>
                        }
                    />
                    <SuperTitle  title={"Clientes"}>
                        <p className="text-base font-medium text-secondary-200 break-words">
                            {generarTextoFecha(
                                searchParams.startDate,
                                searchParams.endDate
                            )}{" "}
                        </p>
                    </SuperTitle>

                    {dataAcumulada?.length === 0 && (
                        <Link
                            href="/clientes/registrar"
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
                            Crear cliente
                        </Link>
                    )}

                    <div
                        id="scrollableDiv"
                        className="h-[calc(100vh-200px)] overflow-y-scroll mt-3"
                    >
                        <InfiniteScroll
                            dataLength={data?.cantidad ?? 0}
                            next={() => setPageNumber(pageNumber + 1)}
                            hasMore={isFetching}
                            loader={
                                <h4 className="text-secondary-200">
                                    Cargando...
                                </h4>
                            }
                            scrollableTarget="scrollableDiv"
                            className="flex flex-col gap-y-3 pb-20"
                        >
                            {dataAcumulada?.map((cliente, index: any) => (
                                <Link
                                    href={`/clientes/${cliente.id}`}
                                    className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex  rounded-lg  py-4 items-center gap-x-3"
                                    key={index}
                                >
                                    <UserCircleIcon height={26} width={26} />
                                    <div className="flex flex-col">
                                        <span className="capitalize text-lg">
                                            {cliente.nombres}
                                        </span>
                                        <span className="text-secondary-200">
                                            Celular: {cliente.celular ? cliente.celular : "no registrado"}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </InfiniteScroll>
                    </div>
                </>
            )}
        </>
    );
}

export default ClientesPage;
