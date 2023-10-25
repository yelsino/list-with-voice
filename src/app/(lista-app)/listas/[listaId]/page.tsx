"use client";
import { Header } from "@/app/components/Header";
import { IconLists, IconTool } from "@/app/components/Icons";
import OptionsMenu from "@/app/components/Popover/Popover";
import { SuperTitle } from "@/app/components/SuperTitle";
import { useVoiceControl } from "@/context/voice.context";
import { formatText } from "@/interfaces/FormatReact";
import { Cliente } from "@/interfaces/client.interface";
import { Abono, Lista } from "@/interfaces/list.interface";
import { dateFormat, dateFormatShort, moneyFormat } from "@/interfaces/mapper";
import { obtenerImagenLista } from "@/redux/chunks/listaChunk";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { updateLista } from "@/redux/features/listaSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetListaByIdQuery } from "@/redux/services/listaApi";
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ListasIdSkeleton from "./lista.skeleton";

interface IParams {
  listaId: string;
}

function ListasIdPage({ params }: { params: IParams }) {
  const { isLoading, isFetching, data, error } = useGetListaByIdQuery({
    id: params.listaId,
  });

  const [detalle, setDetalle] = useState(false);
  const [expand, setExpand] = useState(false);

  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { resetTranscript } = useVoiceControl();

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

  const toggleExpand = () => {
    setExpand(!expand);
    resetTranscript();
  }

  return (
    <>
      {isLoading ? (
        <ListasIdSkeleton />
      ) : (
        <>
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

          <LayoutGroup>
            <AnimatePresence>
              {!expand && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SuperTitle title={formatText(data?.cliente?.nombres ?? "")}>
                    <div className="text-lg text-secondary-200 ">
                      <p className="capitalize">
                        {dateFormat(data?.createdAt)}
                      </p>
                      <p>Monto: {moneyFormat(data?.montoTotal)}</p>
                      <p>Lista pagada: {data?.pagado ? "Si" : "No"}</p>

                      {(data?.abonos?.length ?? 0) > 0 && (
                        <ContainerAbono
                          abonos={data?.abonos}
                          detalle={detalle}
                          setDetalle={setDetalle}
                        />
                      )}
                    </div>
                  </SuperTitle>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div className="pt-2">
              <p
                onDoubleClick={toggleExpand}
                className="font-semibold pb-2 text-secondary-100 uppercase flex items-center gap-x-1 cursor-pointer select-none"
              >
                <ArrowsPointingOutIcon width={16} height={16} />
                <span>Productos</span>
              </p>
              <div
                className={`flex flex-col gap-y-4 ${
                  expand
                    ? "h-[calc(100vh-200px)] sm:h-[calc(100vh-340px)]"
                    : "h-[calc(100vh-400px)] sm:h-[calc(100vh-520px)]"
                }   overflow-x-hidden pb-5 overflow-y-scroll  font-sans `}
              >
                {data?.items.map((item, index) => (
                  <div
                    className="text-secondary-100 flex items-center gap-x-2"
                    key={index}
                  >
                    <span className="text-secondary-200 text-sm">
                      {index + 1}.-{" "}
                    </span>{" "}
                    <div className="w-full  flex justify-between">
                      {item.calculado ? (
                        <span>{item?.nombre}</span>
                      ) : (
                        <span className="tracking-tight">
                          {item.cantidad} {item.medida} {item.nombre}{" "}
                          <span className="text-secondary-200 text-sm">
                            {item.precio} x und
                          </span>
                        </span>
                      )}
                      <span className="">{moneyFormat(item.montoItem)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </LayoutGroup>
        </>
      )}
    </>
  );
}

export default ListasIdPage;

const ContainerAbono = ({ abonos, detalle, setDetalle }: any) => {
  return (
    <LayoutGroup>
      <motion.div className="bg-primary-100">
        <p
          onClick={() => setDetalle(!detalle)}
          className="text-secondary-200 py-1 cursor-pointer"
        >
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
              {abonos.map((abono: Abono, index: number) => (
                <p key={index}>
                  {dateFormatShort(new Date(abono.createdAt))} -{" "}
                  {moneyFormat(abono.monto)}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};
