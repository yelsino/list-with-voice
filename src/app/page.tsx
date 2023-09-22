"use client";
import "regenerator-runtime/runtime";
import Link from "next/link";
import {
    IconAddUser,
    IconConfig,
    IconLists,
    IconSave,
    IconUsers,
} from "./components/Icons";
import { Header } from "./components/Header";
import { Puntos } from "./components/Puntos";
import { SuperTitle } from "./components/SuperTitle";
import * as Realm from "realm-web";
import { useEffect, useState } from "react";
import { formatText } from "@/interfaces/FormatReact";

export default function Home() {

    const items = [
        {
            title: "crear lista",
            url: "/generar",
            icon: <IconSave estilo="" />,
        },
        {
            title: "ver listas",
            url: "/listas",
            icon: <IconLists estilo="" />,
        },
        {
            title: "crear cliente",
            url: "/clientes/registrar",
            icon: <IconAddUser />,
        },
        {
            title: "ver clientes",
            url: "/clientes",
            icon: <IconUsers estilo="" />,
        },
    ];

    return (
        <>
            <Header
                childrenLeft={
                    <Link href="/configuracion">
                        <IconConfig />
                    </Link>
                }
                childrenRight={
                    <Link href="/listas">
                        <IconLists estilo="" />
                    </Link>
                }
            />


            <SuperTitle title={formatText("Hola! Lista nueva?")}>
            </SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Seré su asistente, todos los comandos de voz lo encuentras
                    en configuracion
                </div>
            </div>

            <div className="flex gap-5 flex-wrap mt-5">
                {items.map((item, i) => (
                    <Link
                        href={item.url}
                        key={i}
                        className="text-secondary-100 text-xl bg-primary-100 p-3 rounded-lg flex flex-col justify-center items-center w-24 cursor-pointer"
                    >
                        {item.icon}
                        <p className="text-sm text-center">{item.title}</p>
                    </Link>
                ))}
            </div>
        </>
    );
}
