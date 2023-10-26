"use client";
import { formatText } from "@/interfaces/FormatReact";
import Link from "next/link";
import { Header } from "./components/Header";
import {
    IconAddUser,
    IconConfig,
    IconLists,
    IconNegocio,
    IconSave,
    IconUsers,
} from "./components/Icons";
import { SuperTitle } from "./components/SuperTitle";

export default function Home() {
    const items = [
        {
            title: "crear lista",
            url: "/generar",
            icon: <IconSave estilo="" />,
            display: ""
        },
        {
            title: "ver listas",
            url: "/listas",
            icon: <IconLists estilo="" />,
            display: ""
        },
        {
            title: "crear cliente",
            url: "/clientes/registrar",
            icon: <IconAddUser />,
            display: ""
        },
        {
            title: "ver clientes",
            url: "/clientes",
            icon: <IconUsers estilo="" />,
            display: ""
        },
        {
            title: "negocio",
            url: "/negocio",
            icon: <IconNegocio estilo="" />,
            display: ""
        },
        {
            title: "ver productos",
            url: "/productos",
            icon: <IconNegocio estilo="" />,
            display: "hidden"
        },
        {
            title: "crear producto",
            url: "/productos/crear",
            icon: <IconNegocio estilo="" />,
            display: "hidden"
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

            <SuperTitle title={formatText("Bienvenido! Lista nueva?")}>{null}</SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Seré su asistente, todos los comandos de voz lo encuentras
                    en configuración
                </div>
            </div>

            <div className="flex gap-5 flex-wrap mt-5">
                {items.map((item, i) => {
                    if(item.display !== "hidden"){
                        return (
                            <Link
                                href={item.url}
                                key={i}
                                className="text-secondary-100 text-xl bg-primary-100 p-3 rounded-lg flex flex-col justify-center items-center w-24 cursor-pointer"
                            >
                                {item.icon}
                                <p className="text-sm text-center">{item.title}</p>
                            </Link>
                        )
                    }
                    
                })}
            </div>
        </>
    );
}

