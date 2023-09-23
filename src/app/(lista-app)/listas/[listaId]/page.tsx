"use client";
import { Header } from "@/app/components/Header";
import { IconLists, IconTool } from "@/app/components/Icons";
import OptionsMenu from "@/app/components/Popover/Popover";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { Cliente } from "@/interfaces/client.interface";
import { Lista } from "@/interfaces/list.interface";
import { dateFormat, dateFormatShort, moneyFormat } from "@/interfaces/mapper";
import { obtenerImagenLista } from "@/redux/chunks/listaChunk";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { updateLista } from "@/redux/features/listaSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetListaByIdQuery } from "@/redux/services/listaApi";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ListasIdSkeleton from "./lista.skeleton";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

interface IParams {
    listaId: string;
}

function ListasIdPage({ params }: { params: IParams }) {
    const { isLoading, isFetching, data, error } = useGetListaByIdQuery({
        id: params.listaId,
    });

    const [detalle, setDetalle] = useState(false);

    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const actualizarLista = () => {
        dispatch(updateLista(data as Lista));
        dispatch(seleccionarCliente(data?.cliente as Cliente));
        push(`/generar`);
    };

    const imprimirLista = async () => {
        const session: any = await getSession();
        if (!session) return;

        toast.promise(
            dispatch(
                obtenerImagenLista({
                    lista: data as any,
                    tienda: session.user.tienda,
                })
            ),
            {
                loading: "Generando recibo...",
                success: "Recibo listo",
                error: "Error al generar",
            }
        );
    };

    return (
        <>
            {isLoading ? (
                <ListasIdSkeleton />
            ) : (
                <div className="flex flex-col gap-y-4">
                    <Header
                        childrenLeft={
                            <Link href="/listas" className="text-2xl">
                                <IconLists estilo="" />
                            </Link>
                        }
                        childrenRight={
                            <OptionsMenu
                                imprimirLista={imprimirLista}
                                actualizarLista={actualizarLista}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <IconTool />
                                </div>
                            </OptionsMenu>
                        }
                    />

                    <SuperTitle
                        title={formatText(data?.cliente?.nombres ?? "")}
                    >
                        <div className="text-lg text-secondary-200">
                            <p className="capitalize">
                                {dateFormat(data?.createdAt)}
                            </p>
                            <p>Monto: {moneyFormat(data?.montoTotal)}</p>
                            <p>Lista pagada: {data?.pagado ? "Si" : "No"}</p>

                            {(data?.abonos?.length ?? 0) > 0 && (
                                <LayoutGroup>
                                    <motion.div className="bg-primary-100">
                                        <p
                                            onClick={(e) => {
                                                setDetalle(!detalle);
                                            }}
                                            className="text-secondary-200 py-1 cursor-pointer"
                                        >
                                            {" "}
                                            {"> Detalle de abonos"}
                                        </p>
                                        <AnimatePresence>
                                            {detalle && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="pl-5"
                                                >
                                                    {data?.abonos.map(
                                                        (abono, index) => (
                                                            <ItemAbono
                                                                key={index}
                                                                abono={abono}
                                                            />
                                                        )
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </LayoutGroup>
                            )}
                        </div>
                    </SuperTitle>

                    <div>
                        <p className="font-semibold pb-2 text-secondary-100 uppercase flex justify-between">
                            Productos
                        </p>
                        <div className="flex flex-col gap-y-4 h-[calc(100vh-320px)] pb-16 overflow-x-hidden overflow-y-scroll">
                            {data?.items.map((item, index) => (
                                <div
                                    className="text-secondary-100 flex items-center gap-x-2"
                                    key={index}
                                >
                                    <span className="text-secondary-200 text-sm">
                                        {index + 1}.-{" "}
                                    </span>{" "}
                                    <div className="w-full  flex justify-between text-lg">
                                        {item.calculated ? (
                                            <span>{item?.nombre}</span>
                                        ) : (
                                            <span>
                                                {item.cantidad} {item.medida}{" "}
                                                {item.nombre}{" "}
                                                <span className="text-sm text-secondary-200">
                                                    {item.precio} x und
                                                </span>
                                            </span>
                                        )}
                                        <span>
                                            {moneyFormat(item.montoItem)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListasIdPage;

const ItemAbono = ({ abono }: any) => {
    return (
        <p>
            {dateFormatShort(new Date(abono.createdAt))} -{" "}
            {moneyFormat(abono.monto)}
        </p>
    );
};
