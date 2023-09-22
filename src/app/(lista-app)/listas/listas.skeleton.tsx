"use client";
import Link from "next/link";
import React from "react";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import { dateFormat } from "@/interfaces/mapper";
import { formatText } from "@/interfaces/FormatReact";

function ListasSkeleton() {
    return (
        <>
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

                <SuperTitle title={formatText("Todas Las listas")}>
                    <p className="text-base font-medium text-secondary-200 break-words">
                       Cargando listas...
                    </p>
                </SuperTitle>

                <div className="flex flex-col gap-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((lista, index: any) => (
                        <div
                            className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex justify-between items-center rounded-lg text-lg py-7 animate-pulse"
                            key={index}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ListasSkeleton;
