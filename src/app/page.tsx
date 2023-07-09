"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Voice from "./components/Voice";
import { increment } from "@/redux/features/counterSlice";
import Link from "next/link";

export default function Home() {
    

    const bottonPrueba = async() => {
        try {
            // @ts-nocheck
            const device = await navigator.bluetooth.requestDevice({
                filters: [
                    {
                        services: [
                            "00001200-0000-1000-8000-00805f9b34fb",
                        ],
                    },
                ],
            });

            console.log(device);
            // El usuario ha seleccionado un dispositivo Bluetooth
            console.log("aceptó");
        } catch (error) {
            if (
                error instanceof DOMException &&
                error.code === DOMException.NOT_FOUND_ERR
            ) {
                console.log(
                    "El usuario ha cancelado la selección de dispositivo Bluetooth."
                );
            } else {
                console.error(
                    "Error al solicitar dispositivo de impresora Bluetooth:",
                    error
                );
            }
        }
    }

    return (
        <>
            {/* header */}
            <div className="flex justify-between items-center ">
                {/* <h4 className="text-secondary-100">{count} </h4> */}
                

                <button
                    className="text-secondary-100"
                    onClick={()=>bottonPrueba()}
                >
                    IMPRESORA
                </button>

                <h1 className="text-4xl font-bold font-poppins text-text1 tracking-wider text-secondary-100">
                    <Link href="/configuracion">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="0.8em"
                            height="0.8em"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="#0BE9FD"
                                d="m23.265 24.381l.9-.894c4.164.136 4.228-.01 4.411-.438l1.144-2.785l.085-.264l-.093-.231c-.049-.122-.2-.486-2.8-2.965V15.5c3-2.89 2.936-3.038 2.765-3.461l-1.139-2.814c-.171-.422-.236-.587-4.37-.474l-.9-.93a20.166 20.166 0 0 0-.141-4.106l-.116-.263l-2.974-1.3c-.438-.2-.592-.272-3.4 2.786l-1.262-.019c-2.891-3.086-3.028-3.03-3.461-2.855L9.149 3.182c-.433.175-.586.237-.418 4.437l-.893.89c-4.162-.136-4.226.012-4.407.438l-1.146 2.786l-.09.267l.094.232c.049.12.194.48 2.8 2.962v1.3c-3 2.89-2.935 3.038-2.763 3.462l1.138 2.817c.174.431.236.584 4.369.476l.9.935a20.243 20.243 0 0 0 .137 4.1l.116.265l2.993 1.308c.435.182.586.247 3.386-2.8l1.262.016c2.895 3.09 3.043 3.03 3.466 2.859l2.759-1.115c.436-.173.588-.234.413-4.436Zm-11.858-6.524a4.957 4.957 0 1 1 6.488 2.824a5.014 5.014 0 0 1-6.488-2.824Z"
                            ></path>
                        </svg>
                    </Link>
                </h1>
                <Link
                    href="/listas"
                    className="bg-primary-100 h-14 w-14 relative rounded-2xl"
                >
                    <span className="bg-secondary-100 w-1 h-1 absolute rounded-full top-5 right-5"></span>
                    <span className="bg-secondary-100 w-1 h-1 absolute rounded-full top-5 left-5"></span>
                    <span className="bg-secondary-100 w-1 h-1 absolute rounded-full bottom-5 right-5"></span>
                    <span className="bg-secondary-100 w-1 h-1 absolute rounded-full bottom-5 left-5"></span>
                </Link>
            </div>
            {/* welcome */}
            <div>
                <p className="text-5xl font-black text-gray-400 font-catamaran text-text1 leading-tight">
                    <span className="text-secondary-100">Hola!</span>
                    <br />{" "}
                    <span className=" text-secondary-100">Lista Nueva?</span>
                </p>
            </div>

            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Seré su asistente, todos los comandos de voz lo encuentras
                    en configuracion
                </div>
            </div>

           <Link href='/generar' className="text-secondary-100 flex  gap-x-2 cursor-pointer">
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
        </>
    );
}
