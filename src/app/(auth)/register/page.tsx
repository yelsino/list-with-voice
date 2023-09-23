"use client";
import { formatText } from "@/interfaces/FormatReact";
import {
    registrarUsuario,
} from "@/redux/chunks/listaChunk";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { SuperTitle } from "../../components/SuperTitle";

function Signup() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        toast
            .promise(
                dispatch(
                    registrarUsuario({
                        nombreUsuario: formData.get("nombreUsuario") as string,
                        password: formData.get("password") as string,
                        validPassword: formData.get("validPassword") as string,
                    })
                ),
                {
                    loading: "Iniciando...",
                    success: <b>Credenciales Correctos!</b>,
                    error: <b>Error al iniciar.</b>,
                }
            )
            .then((res: any) => {
                console.log("RES: ", res);
                
                signIn("credentials", {
                    nombreUsuario: res.payload.data.nombreUsuario,
                    password: formData.get("password") as string,
                    redirect: false,
                }).then((sing) => {
                    if (sing?.ok) router.push("/");
                });
            });
    };

   

    return (
        <>
            {" "}
            <span className="mt-5"></span>
            <SuperTitle  title={formatText("Registrarse Lista Voice")}>
            </SuperTitle>
            
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
                    <p className="text-secondary-200">Nombre de usuario</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl rounded-md text-secondary-100 outline-none"
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
                <div>
                    <p className="text-secondary-200">Repetir contraseña</p>
                    <input
                        className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none rounded-md"
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
