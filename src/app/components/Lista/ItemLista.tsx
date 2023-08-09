import { ItemList } from "@/interfaces/list.interface";
import { moneyFormat } from "@/interfaces/mapper";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { IconDelete, IconRefresh } from "../Icons";
import { ItemLoader } from "../Loader/ItemLoader";
import { useAppDispatch } from "@/redux/hooks";
import { updateItem } from "@/redux/features/listaSlice";
import { SpeakLoader } from "../Loader/SpeakLoader";
import { getVoice } from "@/redux/features/voiceSlice";

interface Props {
    item: ItemList;
    index: number;
    deteleItem: (item: ItemList) => void;
}

export const ItemLista = ({ item, index, deteleItem }: Props) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    const updateItemList = (item: ItemList) => {
        dispatch(getVoice(item))
        dispatch(updateItem({ ...item, status: "updating" }));
    };

    // este es el Speack

    return (
        <div
            className={`rounded-lg cursor-pointer p-3  ${
                isOpen ? "bg-primary-100" : ""
            }`}
        >
            {item.status === "pending" ? (
                <div className=" flex  gap-x-5 py-2 items-center">
                    <span className="text-secondary-200 text-xs">
                        {index + 1}.-{" "}
                    </span>{" "}
                    <ItemLoader />
                </div>
            ) : (
                <div>
                    {item.status === "updating" ? (
                        <SpeakLoader />
                    ) : (
                        <TextList
                            index={index}
                            item={item}
                            toggleOpen={toggleOpen}
                        />
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
                            <button
                                onClick={() => deteleItem(item)}
                                className="flex gap-x-1  bg-orange-400 text-black rounded-lg p-1 font-bold  items-center justify-center"
                            >
                                <IconDelete />
                                <span className="text-sm">quitar</span>
                            </button>
                            <button
                                onClick={() => updateItemList(item)}
                                className="flex gap-x-1  bg-secondary-100 text-black rounded-lg p-1 font-bold  items-center justify-center"
                            >
                                <IconRefresh />
                                <span className="text-sm">renovar</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface PropsText {
    index: number;
    item: ItemList;
    toggleOpen: () => void;
}

const TextList = ({ index, item, toggleOpen }: PropsText) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        onClick={toggleOpen}
        id={String(index)}
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
                <span>{item.voz}</span>
            ) : (
                <span>
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
