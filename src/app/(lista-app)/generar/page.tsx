"use client";
import { Header } from "@/app/components/Header";
import { IconHome, IconSave } from "@/app/components/Icons";
import { ItemLista } from "@/app/components/Lista/ItemLista";
import { Loader } from "@/app/components/Loader/Loader";
import { SuperTitle } from "@/app/components/SuperTitle";
import { formatText } from "@/interfaces/FormatReact";
import { Cliente } from "@/interfaces/client.interface";
import { isMongoId, moneyFormat } from "@/interfaces/mapper";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { limpiarLista } from "@/redux/features/listaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useRegistrarListDBMutation,
  useUpdateListMutation,
} from "@/redux/services/listaApi";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function GenerarPage() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const [registrarListDB] = useRegistrarListDBMutation();
  const [updateListDB] = useUpdateListMutation();
  const { lista, cargando, abono, textRecord } = useAppSelector(
    (state) => state.listaReducer
  );
  const clienteState = useAppSelector((state) => state.clienteReducer);

  const guardarLista = async () =>
    lista.id ? actualizarLista() : crearListaNueva();

  const crearListaNueva = async () => {
    if (!clienteState.cliente) {
      toast.error("Indica al cliente", {
        icon: "👏",
      });
      return;
    }

    const someItemFailed = lista.items.some(
      (voice) => voice.status === "error" || voice.status === "pending"
    );

    if (someItemFailed) return;

    const abonos = abono ? [abono] : [];

    toast
      .promise(
        registrarListDB({
          items: lista.items,
          completado: false,
          pagado: lista.pagado ?? false,
          cliente: clienteState.cliente as Cliente,
          abonos: abonos,
          errors: lista.errors,
        }).unwrap(),
        {
          loading: "Generando...",
          success: <b>Lista generada!</b>,
          error: <b>Error al generar lista.</b>,
        }
      )
      .then((resp) => {
        if (resp.id) {
          dispatch(limpiarLista());
          push(`/listas/${resp.id}`);
        }
      })
      .finally(() => {
        dispatch(seleccionarCliente(null));
      });
  };
  const actualizarLista = async () => {
    console.log("voy a actualizar lsita");

    if (!clienteState.cliente) {
      toast.error("Indica al cliente", {
        icon: "👏",
      });
      return;
    }

    const someItemFailed = lista.items.some(
      (voice) => voice.status === "error" || voice.status === "pending"
    );

    if (someItemFailed) return;
    const abonos = abono ? [abono] : [];

    toast
      .promise(
        updateListDB({
          items: lista.items.map((i) => ({
            ...i,
            id: isMongoId(i.id) ? i.id : "111112222233333444445555",
          })),
          cliente: clienteState.cliente as Cliente,
          completado: false,
          pagado: lista.pagado ?? false,
          id: lista.id,
          abonos: abonos,
          errors: lista.errors,
        }).unwrap(),
        {
          loading: "Actualizando...",
          success: <b>Lista actualizada!</b>,
          error: <b>Error al actualizar lista.</b>,
        }
      )
      .then((resp) => {
        if (resp.id) {
          push(`/listas/${resp.id}`);
          dispatch(limpiarLista());
        }
      });
  };

  useEffect(() => {
    if (clienteState.clientes.length > 1) {
      push("generar/para");
    }
    if (clienteState.clientes.length === 1) {
      const cliente = clienteState.clientes[0];
      dispatch(seleccionarCliente({ ...cliente, status: "sent" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clienteState.clientes]);

  return (
    <>
      {cargando ? (
        <Loader texto="registrando..." />
      ) : (
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

          <SuperTitle
            title={formatText(clienteState?.cliente?.nombres ?? "Lista para:")}
          >
            <p className="text-secondary-200 text-lg font-semibold">
              Pagada: {lista.pagado ? "Si" : "No"} - Abonar:{" "}
              {moneyFormat(abono?.monto ?? 0)}
            </p>
          </SuperTitle>

          <div>
            <pre>{JSON.stringify(textRecord, null, 2)}</pre>
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
        </div>
      )}
    </>
  );
}

export default GenerarPage;
