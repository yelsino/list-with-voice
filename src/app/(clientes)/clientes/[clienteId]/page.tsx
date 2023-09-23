"use client";
import { Header } from "@/app/components/Header";
import { IconTool, IconUsers } from "@/app/components/Icons";
import OptionsMenu from "@/app/components/Popover/Popover";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { dateFormat } from "@/interfaces/mapper";
import { obtenerImagenLista } from "@/redux/chunks/listaChunk";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetCostumerQuery } from "@/redux/services/clienteApi";
import { ClipboardIcon, FolderPlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface IParams {
    clienteId: string;
}

function ClienteIdPage({ params }: { params: IParams }) {
    const { isLoading, isFetching, data, error } = useGetCostumerQuery({
        id: params.clienteId,
    });

    const { push } = useRouter();
    const dispatch = useAppDispatch();

    return (
        <>
            {isLoading ? (
                <p className="text-secondary-100">Cargando...</p>
            ) : (
                <div className="flex flex-col gap-y-4">
                    <Header
                        childrenLeft={
                            <Link href="/clientes" className="text-2xl">
                                <IconUsers estilo="w-8 h-8" />
                            </Link>
                        }
                        childrenRight={
                            <OptionsMenu
                                imprimirLista={() =>
                                    dispatch(obtenerImagenLista(data as any))
                                }
                                actualizarLista={() => {}}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <IconTool />
                                </div>
                            </OptionsMenu>
                        }
                    />

                    <SuperTitle title={formatText(data?.data.nombres ?? "")}>
                        <div className="text-secondary-200 text-lg font-normal">
                            Este usuario cuenta con {data?.data.listas?.length}{" "}
                            listas
                        </div>
                    </SuperTitle>

                    {data?.data.listas?.length === 0 ? (
                        <div>
                            <Link
                                onClick={()=>{
                                    dispatch(seleccionarCliente({
                                        celular: data.data.celular,
                                        nombres: data.data.nombres,
                                        id: data.data.id
                                    }));
                                    // push('/generar')
                                }}
                                href="/generar"
                                className="text-secondary-100 bg-primary-100 p-3 rounded-lg flex flex-col justify-center items-center w-32 gap-y-1 cursor-pointer"
                            >
                                <FolderPlusIcon width={32} height={32} />
                                <p className=" text-center">
                                    Crear Lista
                                </p>
                            </Link>
                        </div>
                    ) : null}

                    <div>
                        {data?.data.listas?.map((lista, index: any) => (
                            <Link
                                href={`/listas/${lista.id}`}
                                className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex  rounded-lg  py-4 items-center gap-x-3"
                                key={index}
                            >
                                <ClipboardIcon height={28} width={28} />
                                <Link href={`/listas/${lista.id}`} className="flex flex-col">
                                    <p className="text-lg">Lista pagada s/. 50.00</p>
                                    
                                    <div className="text-secondary-200">
                                        <p className="capitalize">
                                        {dateFormat(lista.createdAt)}
                                    </p>
                                    </div>
                                </Link>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default ClienteIdPage;
