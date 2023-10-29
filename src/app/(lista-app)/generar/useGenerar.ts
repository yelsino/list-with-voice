import { Cliente } from '@/interfaces/client.interface';
import { isMongoId } from '@/interfaces/mapper';
import { seleccionarCliente } from '@/redux/features/clienteSlice';
import { addItemsToList, catchUrlRecord, limpiarLista, restaurarItems, updateItems } from '@/redux/features/listaSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useConvertRecordToJsonMutation, useRegistrarListDBMutation, useUpdateListMutation } from '@/redux/services/listaApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function useGenerar() {

  const dispatch = useAppDispatch();
  const { push } = useRouter();


  const [registrarListDB] = useRegistrarListDBMutation();
  const [updateListDB] = useUpdateListMutation();
  const [convertirRecordJson] = useConvertRecordToJsonMutation();
  const LR = useAppSelector((state) => state.listaReducer);
  const CR = useAppSelector((state) => state.clienteReducer);

  const guardarLista = async () => LR.lista.id
    ? actualizarLista()
    : crearListaNueva();

  const crearListaNueva = async () => {
    const abonos = LR.abono ? [LR.abono] : [];

    toast
      .promise(
        registrarListDB({
          items: LR.lista.items,
          completado: false,
          pagado: LR.lista.pagado ?? false,
          cliente: CR.cliente as Cliente,
          abonos: abonos,
          errors: LR.lista.errors,
        }).unwrap(),
        {
          loading: "Generando...",
          success: 'Lista generada!',
          error: 'Error al generar lista.',
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

    const abonos = LR.abono ? [LR.abono] : [];

    toast
      .promise(
        updateListDB({
          items: LR.lista.items.map((i) => ({
            ...i,
            id: isMongoId(i.id) ? i.id : "111112222233333444445555",
          })),
          cliente: CR.cliente as Cliente,
          completado: false,
          pagado: LR.lista.pagado ?? false,
          id: LR.lista.id,
          abonos: abonos,
          errors: LR.lista.errors,
        }).unwrap(),
        {
          loading: "Actualizando...",
          success: 'Lista actualizada!',
          error: 'Error al actualizar lista.',
        }
      )
      .then((resp) => {
        if (resp.id) {
          push(`/listas/${resp.id}`);
          dispatch(limpiarLista());
        }
      });
  };

  const toastRecord = (formData: FormData) => {
    toast
      .promise(convertirRecordJson(formData).unwrap(), {
        loading: "Convirtiendo grabación...",
        error: "Error al convertir grabación",
        success: "Converción de grabación completa",
      })
      .then((res) => {
        if (res.items.length === 0) return toast.error("No se obtuvo resultados");
        dispatch(catchUrlRecord(res.recordUrl))

        const newItems = LR.lista.items.map((item) =>
          item.status === "updating" ? res.items[0] : item
        );

        const itemupdating = LR.lista.items.some(
          (item) => item.status === "updating"
        );

        return itemupdating
          ? dispatch(updateItems(newItems))
          : dispatch(addItemsToList(res.items));
      })
      .finally(() => {
        dispatch(restaurarItems());
      });
  }


  return {
    guardarLista,
    toastRecord,
    lista: LR.lista,
    nombreCliente: CR.cliente?.nombres,
  }
}

export default useGenerar