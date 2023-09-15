import React, { useState } from "react";
import Datepicker, {
    DateType,
    DateValueType,
} from "react-tailwindcss-datepicker";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";
import { selectDate } from "@/redux/features/listaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";

function SelectDate() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { startDate, endDate } = useAppSelector(
        (state) => state.listaReducer
    );

    const handleOnChange = (values: DateValueType) => {
        dispatch(selectDate(values));
        // setTimeout(() => {
        //     router.back();
        // }, 800);
    };

    return (
        <Datepicker
            i18n={"es"}
            primaryColor={"orange"}
            displayFormat={"DD/MM/YYYY"}
            separator={"a"}
            showShortcuts={true}
            inputClassName=" w-full bg-primary-100 text-secondary-100 text-lg rounded-lg p-3 placeholder:text-secondary-200 text-lg"
            configs={
                {
                    shortcuts: {
                        today: "Hoy",
                        //   yesterday: "Ayer",
                        last3Days: {
                            text: "Ultimos 3 dias",
                            period: {
                                start: format(
                                    subDays(new Date(), 3),
                                    "yyyy-MM-dd"
                                ),
                                end: format(new Date(), "yyyy-MM-dd"),
                            },
                        },
                        last7Days: {
                            text: "Ultimos 7 dias",
                            period: {
                                start: format(
                                    subDays(new Date(), 7),
                                    "yyyy-MM-dd"
                                ),
                                end: format(new Date(), "yyyy-MM-dd"),
                            },
                        },
                        currentWeek: {
                            text: "Esta semana",
                            period: {
                                start: format(
                                    startOfWeek(new Date(), {
                                        weekStartsOn: 1,
                                    }),
                                    "yyyy-MM-dd"
                                ),
                                end: format(new Date(), "yyyy-MM-dd"),
                            },
                        },
                        currentMonth: "Este mes",
                        pastMonth: "Mes pasado",
                    },
                } as any
            }
            value={{
                startDate: startDate as DateType,
                endDate: endDate as DateType,
            }}
            onChange={handleOnChange}
        />
    );
}

export default SelectDate;
