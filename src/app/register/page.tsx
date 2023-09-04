"use client";
import { useRouter } from "next/navigation";
import { SuperTitle } from "../components/SuperTitle";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import {
    obtenerImagenLista,
    registrarUsuario,
} from "@/redux/chunks/listaChunk";

function Signup() {
    const [error, setError] = useState();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const respuesta: any = await dispatch(
            registrarUsuario({
                nombreUsuario: formData.get("nombreUsuario") as string,
                password: formData.get("password") as string,
                validPassword: formData.get("validPassword") as string,
            })
        );
            
        if (respuesta.payload.status) {
            const res = await signIn("credentials", {
                nombreUsuario: respuesta.payload.data.nombreUsuario,
                password: formData.get("password") as string,
                redirect: false,
            });
            console.log(res);
            
            if (res?.ok) router.push("/");
        }
    };

    return (
        <>
            {" "}
            <SuperTitle>
                <p className="">
                    <span>Registrar en</span>
                    <br /> <span>Voice List</span>
                    {/* <br /> <span>Voice List</span> */}
                </p>
            </SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Usa la inteligencia artificial para crear rapidamente listas
                    de pedidos y generar voucher de pagos.
                </div>
            </div>
            {/* inputs */}
            <form
                autoComplete="new-password"
                className="flex flex-col gap-y-4 mt-3"
                onSubmit={handleSubmit}
            >
                <div>
                    <p className="text-secondary-100">Nombre de usuario</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="text"
                        placeholder="ej: sunombre"
                        name="nombreUsuario"
                    />
                </div>
                <div>
                    <p className="text-secondary-100">Contraseña</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="password"
                        placeholder="********"
                        name="password"
                    />
                </div>
                <div>
                    <p className="text-secondary-100">Repetir contraseña</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none"
                        type="password"
                        placeholder="********"
                        name="validPassword"
                    />
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="bg-secondary-100 px-5 py-3 rounded-full font-bold"
                    >
                        Registrar
                    </button>
                </div>
            </form>
        </>
    );
}

export default Signup;
