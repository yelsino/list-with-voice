"use client";
import { SuperTitle } from "@/app/components/SuperTitle";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

function ParaPage() {
    const dispatch = useAppDispatch();
    const { clientes } = useAppSelector((state) => state.clienteReducer);
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col gap-y-3">
                <SuperTitle
                    title={
                        <p className="text-4xl">
                            <span>
                                Selección de <br /> clientes similares{" "}
                            </span>
                        </p>
                    }
                >
                    <p className="text-base font-normal  text-secondary-200 break-words">
                        Se encontraron algúnas coincidencias, debes seleccionar
                        al cliente que te refieres
                    </p>
                </SuperTitle>

                <div className="h-[calc(100vh-320px)] overflow-y-scroll flex flex-col gap-y-4 mt-3 pb-20 ">
                    {clientes?.map((cliente, index: any) => (
                        <div
                            onClick={() => {
                                dispatch(
                                    seleccionarCliente({
                                        ...cliente,
                                        status: "sent",
                                    })
                                );
                                router.back();
                            }}
                            className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex gap-x-3 items-center  rounded-lg  py-4"
                            key={index}
                        >
                            <UserCircleIcon height={28} width={28} />
                                    <div className="flex flex-col">
                                        <span className="capitalize text-lg">
                                            {cliente.nombres}
                                        </span>
                                        <span className="text-secondary-200">
                                            Celular: 939616350
                                        </span>
                                    </div>
                        </div>
                    ))}
                </div>

              
            </div>
        </>
    );
}

export default ParaPage;
