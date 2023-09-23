"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { SuperTitle } from "@/app/components/SuperTitle";
import { toast } from "react-hot-toast";
import { formatText } from "@/interfaces/FormatReact";

function Signin() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        toast
            .promise(
                signIn("credentials", {
                    nombreUsuario: formData.get("nombreUsuario"),
                    password: formData.get("password"),
                    redirect: false,
                }),
                {
                    loading: "Iniciando...",
                    success: <b>Credenciales Correctos!</b>,
                    error: <b>Error al iniciar.</b>,
                }
            )
            .then((res) => {
                console.log(res);
                
                if (res?.error) setError(res.error as string);
                return router.push("/");
            });
    };

    return (
        <>
            {" "}
            <span className="mt-5"></span>
            <SuperTitle title={formatText("Bienvenido Lista Voice")}>
            </SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Una applicación con inteligencia artificial para crear
                    rapidamente listas de pedidos y generar vouchers de pago
                </div>
            </div>
            {/* inputs */}
            {error && (
                <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
            )}
            <form
                onSubmit={handleSubmit}
                autoComplete="new-password"
                className="flex flex-col gap-y-4 mt-3"
            >
                <div>
                    <p className="text-secondary-200">Nombre de usuario</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none rounded-md"
                        type="text"
                        placeholder="ej: sunombre"
                        name="nombreUsuario"
                    />
                </div>
                <div>
                    <p className="text-secondary-200">Contraseña</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none rounded-md"
                        type="password"
                        placeholder="********"
                        name="password"
                    />
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="bg-secondary-100 px-5 py-3 rounded-full font-bold"
                    >
                        Iniciar
                    </button>
                </div>
            </form>
        </>
    );
}

export default Signin;
