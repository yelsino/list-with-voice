import { useVoiceControl } from "@/context/voice.context";
import { ItemList } from "@/interfaces/list.interface";
import { moneyFormat } from "@/interfaces/mapper";
import {
  deleteItem,
  restaurarItems,
  selectItem,
  updateItem,
} from "@/redux/features/listaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { IconDelete, IconRefresh } from "../Icons";

interface Props {
  item: ItemList;
  index: number;
}

export const ItemLista = ({ item, index }: Props) => {
  const { itemSelected } = useAppSelector((state) => state.listaReducer);

  const { resetTranscript } = useVoiceControl();

  const dispatch = useAppDispatch();
  const toggleOpen = () => {
    dispatch(restaurarItems())
    if (itemSelected?.id === item.id) {
      
      dispatch(selectItem(null));
      resetTranscript();
      return;
    }
    
    dispatch(selectItem(item));
    dispatch(updateItem({ ...item, status: "updating" }));
    resetTranscript();
  };

  return (
    <div
      onClick={toggleOpen}
      className={`rounded-lg cursor-pointer p-2 flex justify-between  ${
        itemSelected?.id === item.id ? "bg-primary-100" : ""
      }`}
    >
      <div className="w-full">
        {
          item.status === "updating" 
          ? <p className="flex items-center gap-x-2 text-lg text-secondary-100">{item.texto}</p>
          : <TextList item={item} index={index} />
        }
      </div>

      <AnimatePresence>
        {itemSelected?.id === item.id && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=""
          >
             <button 
                    onClick={()=>dispatch(deleteItem(item))}
                    className="flex gap-x-1  bg-orange-400 text-black rounded-lg p-1 font-bold  items-center justify-center">
                  <IconDelete style="w-5 h-5" />
                </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PropsText {
  item: ItemList;
  index: number;
  // toggleOpen: () => void;
}

const TextList = ({ item, index }: PropsText) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id={String(item.id)}
      className="flex items-center gap-x-2 text-lg w-full "
    >
      <span className="text-secondary-200 text-xs">{index + 1}.- </span>{" "}
      <div className={` flex justify-between  w-full text-secondary-100`}>
        {item.calculado ? (
          <span>{item.nombre}</span>
        ) : (
          <span className="break-words">
            {item.cantidad} {item.medida} {item.nombre}{" "}
            <span className="text-sm">{item.precio} x und</span>
          </span>
        )}
        <span>
          {" "}
          <span className="text-sm"> </span> {moneyFormat(item.montoItem)}
        </span>
      </div>
    </motion.div>
  );
};
