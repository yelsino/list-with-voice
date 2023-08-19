import { ItemList, Voice } from "@/interfaces/list.interface";
import { moneyFormat } from "@/interfaces/mapper";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { IconDelete, IconRefresh } from "../Icons";
import { ItemLoader } from "../Loader/ItemLoader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectItem, updateItem } from "@/redux/features/listaSlice";
import { SpeakLoader } from "../Loader/SpeakLoader";
import { getVoice, updateVoice } from "@/redux/features/voiceSlice";
import { useSpeechRecognition } from "react-speech-recognition";

interface Props {
    item: ItemList;
    deteleItem: (item: ItemList) => void;
    index: number;
}

export const ItemLista = ({ item, deteleItem, index }: Props) => {
    const { resetTranscript } = useSpeechRecognition();

    const { voiceSelected, voices } = useAppSelector(
        (state) => state.VoiceReducer
    );
    const { itemList } = useAppSelector((state) => state.listaReducer);

    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (item.codigo === voiceSelected?.codigo) {
            dispatch(getVoice(null));
            dispatch(selectItem(null));
        }
    };
    const updateItemList = (item: ItemList) => {
        resetTranscript();
        const voice = voices.find((voice) => voice.codigo === item.codigo);
        dispatch(getVoice(voice as Voice));
        // dispatch(updateVoice({...voice, }));
        dispatch(selectItem(item));
        dispatch(updateItem({ ...item, status: "updating" }));
    };



    return (
        <div
            className={`rounded-lg cursor-pointer p-3  ${
                isOpen ? "bg-primary-100" : ""
            }`}
        >
            {item.status === "pending" ? (
                <div className=" flex  gap-x-5 py-2 items-center">
                    <span className="text-secondary-200 text-xs">
                        {index + 1 }.-{" "}
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
                {isOpen && (
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
                                    onClick={() => deteleItem(item)}
                                    className="flex gap-x-1  bg-orange-400 text-black rounded-lg p-1 font-bold  items-center justify-center"
                                >
                                    <IconDelete />
                                    <span className="text-sm">quitar</span>
                                </button>
                            )}
                            {item.status === "updating" ? (
                                <button
                                    onClick={() =>  dispatch(updateItem(itemList as ItemList))}
                                    className="flex gap-x-1  bg-secondary-100 text-black rounded-lg p-1 font-bold  items-center justify-center"
                                >
                                    <IconRefresh />
                                    <span className="text-sm">cancelar</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => updateItemList(item)}
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
    const dispatch = useAppDispatch();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            // onClick={toggleOpen}
            id={String(item.codigo)}
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
