
import { addError, addItemsToList, catchUrlRecord, restaurarItems, updateItems } from '@/redux/features/listaSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useConvertRecordToJsonMutation, useConvertTextToJsonMutation } from '@/redux/services/listaApi';
import useLLM from "usellm";
import { ItemList } from '@prisma/client';
import toast from 'react-hot-toast';
import { textToPrices } from '@/redux/chunks/productosChunck';
import { useCreatePricesMutation } from '@/redux/services/productApi';

function useCreateItems() {

  const dispatch = useAppDispatch();
  const llm = useLLM({ serviceUrl: "/api/llm" });
  const [convertirRecordJson] = useConvertRecordToJsonMutation();
  const [convertTextToJson] = useConvertTextToJsonMutation()
  const [createPrices] = useCreatePricesMutation()
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
        if (itemupdating) dispatch(addError({ itemList: LR.itemSelected as ItemList }));

        return itemupdating
          ? dispatch(updateItems(newItems))
          : dispatch(addItemsToList(items));
      })
      .finally(() => {
        dispatch(restaurarItems());
      });
  }

  const toasTextoToProductos = (texto:string) => {
    toast.promise(createPrices(texto).unwrap(), {
      loading: "Convirtiendo texto a productos...",
      error: "Error al convertir texto",
      success: "Converción de texto completa",
    });
  }

  const toastTranscription = async (audioUrl: string) => {
    const { text } = await toast.promise(llm.transcribe({ audioUrl }), {
      loading: "Convirtiendo grabación...",
      error: "Error al convertir grabación",
      success: "Converción de grabación completa",
    });

    return text
  }


  return {
    toastRecordToItems,
    toastTextToItems,
    toastTranscription,
    toasTextoToProductos
  }
}

export default useCreateItems