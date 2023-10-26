"use client";
import { Header } from "@/app/components/Header";
import { IconHome, IconRefresh, IconSave, IconUser } from "@/app/components/Icons";
import { ItemLista } from "@/app/components/Lista/ItemLista";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import useGenerar from "./useGenerar";

import { useAppSelector } from "@/redux/hooks";


function GenerarPage() {

  const { 
    guardarLista, 
    nombreCliente, 
    lista, 
    toastRecord
  } = useGenerar()

  const LR = useAppSelector((state) => state.listaReducer);
  const GR = useAppSelector((state) => state.globalReducer);

  const retryTranscription = () => {
    const formData = new FormData();
    formData.append("audio_url", LR.recordUrl);
    formData.append("service", GR.recordService);
    toastRecord(formData);

  }

  // loader no está funcionando por que no se actualiza cargando..
  return (
    <>

      <div className="flex flex-col gap-y-4 ">
        <Header
          childrenLeft={
            <Link href="/" className="text-2xl">
              <IconHome />
            </Link>
          }
          childrenRight={
            <button onClick={guardarLista}>
              <IconSave estilo="" />
            </button>
          }
        />

        <div className="font-catamaran ">
          <div className="flex items-center gap-x-3">
            <Link href='/seleccionar/cliente' className="text-secondary-100 bg-secondary-100/5 inline-flex rounded-full p-2 ">
              <IconUser />
            </Link>
            <p className="text-2xl  text-secondary-100 font-black   leading-tight capitalize">
              {nombreCliente ? nombreCliente : "Cliente de Tienda"}
            </p>
          </div>

        </div>

        <div>
          <p className="text-secondary-100 font-semibold text-lg ">
            Productos
          </p>
          {lista.items.length === 0 && (
            <div className="flex flex-col gap-y-3">
              <p className="text-secondary-200">
                Aún no ha añadido ningun producto a la lista, ver lista de{" "}
                <Link href="/configuracion" className="text-secondary-100">
                  comandos
                </Link>{" "}
                de voz para empezar a registrar los productos
              </p>

              <div>
                <p className="text-secondary-100 text-lg font-semibold">
                  Añadir items
                </p>
                <p className="text-secondary-200">
                  Forma 1: 20 soles de tomates
                </p>
                <p className="text-secondary-200">
                  Forma 2: 10 kilos de tomate a 2 soles
                </p>
              </div>
            </div>
          )}
          <LayoutGroup>
            <motion.div className="flex flex-col  h-[calc(100vh-320px)] pb-10 overflow-hidden overflow-y-scroll gap-y-1">
              {lista.items.map((item, index) => (
                <ItemLista key={item.id} index={index} item={item} />
              ))}
            </motion.div>
          </LayoutGroup>
        </div>
        {
          LR.recordUrl && <button
            onClick={retryTranscription}
            className="z-30 fixed sm:absolute bottom-0  sm:translate-y-0  right-1 text-fuchsia-500  p-4  sm:rounded-3xl cursor-pointer ">
            <IconRefresh />
          </button>
        }

      </div>

    </>
  );
}

export default GenerarPage;
