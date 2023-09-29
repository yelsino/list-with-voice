import { useVoiceControl } from "@/context/voice.context";
import { ItemList } from "@/interfaces/list.interface";
import { moneyFormat } from "@/interfaces/mapper";
import {
    deleteItem,
    selectItem,
    updateItem,
} from "@/redux/features/listaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { IconDelete, IconRefresh } from "../Icons";
import { ItemLoader } from "../Loader/ItemLoader";
import { SpeakLoader } from "../Loader/SpeakLoader";

interface Props {
    item: ItemList;
    index: number;
}

export const ItemLista = ({ item, index }: Props) => {
    const { itemSelected } = useAppSelector((state) => state.listaReducer);

    const { resetTranscript } = useVoiceControl();

    const dispatch = useAppDispatch();
    const toggleOpen = () => {
        if (itemSelected?.id === item.id) {
            dispatch(selectItem(null));
            resetTranscript();
            return;
        }
        dispatch(selectItem(item));
        resetTranscript();
    };

    const eliminarItem = () => {
        dispatch(deleteItem(item));
    };

    const renovarItem = (item: ItemList) => {
        dispatch(updateItem({ ...item, status: "updating" }));
        resetTranscript();
    };

    return (
        <div
            className={`rounded-lg cursor-pointer p-2  ${
                itemSelected?.id === item.id ? "bg-primary-100" : ""
            }`}
        >
            {item.status === "pending" || item.status === "sent" ? (
                <div
                    onClick={toggleOpen}
                    className=" flex  gap-x-5 py-2 items-center"
                >
                    <span className="text-secondary-200 text-xs">
                        {index + 1}.-{" "}
                    </span>{" "}
                    <ItemLoader />
                </div>
            ) : (
                <div onClick={toggleOpen}>
                    {item.status === "updating" ? (
                        <div className="flex text-secondary-100">
                            <SpeakLoader />{" "}
                            <span className="translate-x-6">{item.voz}</span>
                        </div>
                    ) : (
                        <TextList item={item} index={index} />
                    )}
                </div>
            )}
            <AnimatePresence>
                {itemSelected?.id === item.id && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pt-4"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.5 },
                            }}
                            exit={{ opacity: 0 }}
                            className="flex gap-x-3 justify-end "
                        >
                            {item.status !== "updating" && (
                                <button
                                    onClick={eliminarItem}
                                    className="flex gap-x-1  bg-orange-400 text-black rounded-lg p-1 font-bold  items-center justify-center"
                                >
                                    <IconDelete />
                                    <span className="text-sm">quitar</span>
                                </button>
                            )}
                            {item.status === "updating" ? (
                                <button
                                    onClick={() => {
                                        dispatch(
                                            updateItem(itemSelected as ItemList)
                                        );
                                    }}
                                    className="flex gap-x-1  bg-secondary-100 text-black rounded-lg p-1 font-bold  items-center justify-center"
                                >
                                    <IconRefresh />
                                    <span className="text-sm">cancelar</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => renovarItem(item)}
                                    className="flex gap-x-1  bg-secondary-100 text-black rounded-lg p-1 font-bold  items-center justify-center"
                                >
                                    <IconRefresh />
                                    <span className="text-sm">renovar</span>
                                </button>
                            )}
                        </motion.div>
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
            layout
            id={String(item.id)}
            className="flex items-center gap-x-2 text-lg"
        >
            <span className="text-secondary-200 text-xs">{index + 1}.- </span>{" "}
            <div
                className={`w-full  flex justify-between ${
                    item.status === "error"
                        ? "text-rose-500"
                        : "text-secondary-100 "
                }`}
            >
                {item.calculated ? (
                    <span>{item.nombre}</span>
                ) : (
                    <span className="break-words">
                        {item.cantidad} {item.medida} {item.nombre}{" "}
                        <span className="text-sm">{item.precio} x und</span>
                    </span>
                )}
                <span>
                    {" "}
                    <span className="text-sm"> </span>{" "}
                    {moneyFormat(item.montoItem)}
                </span>
            </div>
        </motion.div>
    );
};
