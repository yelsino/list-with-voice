"use client";
import { useRouter } from "next/navigation";
import { SuperTitle } from "../components/SuperTitle";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

function Signin() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            nombreUsuario: formData.get("nombreUsuario"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) setError(res.error as string);

        if (res?.ok) return router.push("/");
    };

    return (
        <>
            {" "}
            <SuperTitle>
                <p className="">
                    <span>Hola!</span>
                    <br /> <span>Bienvenido a</span>
                    <br /> <span>Voice List</span>
                </p>
            </SuperTitle>
            {/* contenido */}
            <div className="flex flex-col gap-y-5">
                <div className="font-poppins text-lg  text-secondary-200">
                    Una applicación con inteligencia artificial para crear
                    rapidamente listas de pedidos y generar vouchers de pago
                </div>
            </div>
            {/* inputs */}
            {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
            <form
                onSubmit={handleSubmit}
                autoComplete="new-password"
                className="flex flex-col gap-y-4 mt-3"
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

                <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-secondary-100 px-5 py-3 rounded-full font-bold">
                        Iniciar
                    </button>
                </div>
            </form>
        </>
    );
}

export default Signin;
