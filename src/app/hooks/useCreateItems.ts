
import { addItemsToList, catchUrlRecord, restaurarItems, updateItems } from '@/redux/features/listaSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useConvertRecordToJsonMutation, useConvertTextToJsonMutation } from '@/redux/services/listaApi';
import toast from 'react-hot-toast';

function useCreateItems() {

  const dispatch = useAppDispatch();

  const [convertirRecordJson] = useConvertRecordToJsonMutation();
  const [convertTextToJson] = useConvertTextToJsonMutation()
  const LR = useAppSelector((state) => state.listaReducer);

  const toastRecordToItems = (formData: FormData) => {
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

  const toastTextToItems = (texto: string) => {
    toast
      .promise(convertTextToJson(texto).unwrap(), {
        loading: "Convirtiendo texto...",
        error: "Error al convertir texto",
        success: "Converción de texto completa",
      })
      .then((items) => {
        if (items.length === 0) return toast.error("No se obtuvo resultados");

        const newItems = LR.lista.items.map((item) =>
          item.status === "updating" ? items[0] : item
        );

        const itemupdating = LR.lista.items.some(
          (item) => item.status === "updating"
        );

        return itemupdating
          ? dispatch(updateItems(newItems))
          : dispatch(addItemsToList(items));
      })
      .finally(() => {
        dispatch(restaurarItems());
      });
  }


  return {
    toastRecordToItems,
    toastTextToItems,
  }
}

export default useCreateItems