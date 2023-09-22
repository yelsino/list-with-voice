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

export default function Home() {
    const [dataSet, setDataSet] = useState([]);

    // const getData = async () => {
    //     const app = new Realm.App({ id: "<YOUR_APP_ID>" });
    //     const credentials = Realm.Credentials.anonymous();
    //     try {
    //       const user = await app.logIn(credentials);
    //       user.
    //     } catch(err) {
    //       console.error("Failed to log in", err);
    //     }

    // };

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

    // useEffect(() => {
    //     getData()
    // }, []);

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


            <SuperTitle>
                <p className="">
                    <span>Hola!</span>
                    <br /> <span>Lista Nueva?</span>
                </p>
            </SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Seré su asistente, todos los comandos de voz lo encuentras
                    en configuracion
                </div>
            </div>

            <div className="flex gap-5 flex-wrap">
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
