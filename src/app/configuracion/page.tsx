import React from "react";
import { Header } from "../components/Header";
import Link from "next/link";
import { IconConfig, IconHome, IconSave } from "../components/Icons";
import { Puntos } from "../components/Puntos";
import { SuperTitle } from "../components/SuperTitle";
import { Loader } from "../components/Loader/Loader";

function ConfiguracionPage() {
    return (
        <div>
            <Header
                childrenLeft={
                    <Link href="/">
                        <IconHome />
                    </Link>
                }
                childrenRight={
                    <Link href="/listas" className="w-full h-full ">
                        <Puntos />
                    </Link>
                }
            />

            <SuperTitle>
                <p className="">
                    <span>Que</span>
                    <br /> <span>Configurar?</span>
                </p>
            </SuperTitle>

            <p className="font-catamaran text-text1 leading-tight text-secondary-200 pb-3">
                Comandos del asistente
            </p>

            <div className="flex gap-5 flex-wrap">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, i) => (
                    <div key={i} className="text-secondary-100 text-xl bg-primary-100 p-3 rounded-lg">
                        <IconSave estilo="h-8 w-8" />
                        <p className="text-sm text-center">lista</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConfiguracionPage;
