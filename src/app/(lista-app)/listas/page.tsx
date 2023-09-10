"use client";
import Link from "next/link";
import React from "react";
import { dateFormat, moneyFormat } from "@/interfaces/mapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetListasQuery } from "@/redux/services/listaApi";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import ListasSkeleton from "./listas.skeleton";

function ListasPage() {
    const { isLoading, isFetching, data, error } = useGetListasQuery(null);
    const dispatch = useAppDispatch();

    const { itemsList, pagada, nombreCliente, cargando } = useAppSelector(
        (state) => state.listaReducer
    );

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
                            <Link href="/" className="text-2xl">
                                <IconCalendar />
                            </Link>
                        }
                    />

                    <SuperTitle>
                        <p className="text-4xl">
                            <span>Todas</span>
                            <br /> <span>Las listas</span>
                        </p>
                        <p className="text-lg font-medium text-secondary-200">
                            {dateFormat(new Date())}
                        </p>
                    </SuperTitle>

                    <div className="flex flex-col gap-y-4">
                        {data?.map((lista, index: any) => (
                            <Link
                                href={`/listas/${lista.id}`}
                                className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex justify-between items-center rounded-lg text-lg py-4"
                                key={index}
                            >
                                <span className="capitalize">
                                    {lista.nombreCliente}
                                </span>
                                <span>{moneyFormat(lista.montoTotal)}</span>
                            </Link>
                        ))}

                        {data?.length === 0 && (
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
