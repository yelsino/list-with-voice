'use client'
import { Header } from "@/app/components/Header";
import { IconDelete, IconLists, IconUsers } from "@/app/components/Icons";
import InputString from "@/app/components/InputString";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { useRegisterCostumerMutation } from "@/redux/services/clienteApi";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";

function ClientesPage() {
    const [registerCostumer] = useRegisterCostumerMutation();
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const nombres = formData.get("nombres");
        const celular = formData.get("celular") ?? "";

        if (!nombres) {
            return toast.error("Indica el nombre del cliente", {
                icon: "👏",
            });
        }
        toast.promise(
            registerCostumer({
                nombres: nombres.toString(),
                celular: celular.toString(),
            }).unwrap(),
            {
                loading: "Generando...",
                success: <b>Cliente generado!</b>,
                error: <b>Error al generar cliente.</b>,
            }
        ).then((data)=>{
            if(data.status){
                formRef.current?.reset();
            }
            
        });
    };

  

    return (
        <div className="text-secondary-100 flex flex-col gap-y-5">
            <Header
                childrenLeft={
                    <Link href="/clientes" className="text-2xl">
                        <IconUsers estilo="w-8 h-8" />
                    </Link>
                }
                childrenRight={
                    <div className="cursor-pointer">
                        <IconDelete />
                    </div>
                }
            />
            <SuperTitle  title={formatText("Registro De clientes")}>
                <p className="text-base font-medium text-secondary-200 break-words">
                    <span className="text-secondary-200">
                        Crea rapidamente clientes. utilizando los comandos de
                        voz, <Link href="/configuracion" className="text-secondary-100">click</Link>{" "}
                        aqui para ver los comandos
                    </span>
                </p>
            </SuperTitle>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <InputString
                    title="Nombres"
                    name="nombres"
                    placeholder="ej: sunombre"
                    type="text"
                />
                <InputString
                    title="Celular"
                    name="celular"
                    placeholder="ej: 939616350"
                    type="text"
                />

                <button
                    type="submit"
                    className="bg-secondary-100 p-3 rounded-lg text-black font-semibold"
                >
                    Finalizar Registro
                </button>
            </form>
        </div>
    );
}

export default ClientesPage;
