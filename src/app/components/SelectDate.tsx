import React, { useState } from "react";
import Datepicker, {
    DateType,
    DateValueType,
} from "react-tailwindcss-datepicker";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import { udateSearchParams } from "@/redux/features/globalSlice";

function SelectDate() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { searchParams } = useAppSelector((state) => state.globalReducer);

    const handleOnChange = (values: DateValueType) => {
        dispatch(
            udateSearchParams({
                ...searchParams,
                startDate: values?.startDate as DateType,
                endDate: values?.endDate as DateType,
            })
        );
    };

    return (
        <Datepicker
            i18n={"es"}
            primaryColor={"orange"}
            displayFormat={"DD/MM/YYYY"}
            separator={"a"}
            showShortcuts={true}
            inputClassName=" w-full bg-primary-100 text-secondary-100 text-lg rounded-lg p-3 placeholder:text-secondary-200 text-lg focus:outline-none"
            readOnly
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
                startDate: searchParams.startDate as DateType,
                endDate: searchParams.endDate as DateType,
            }}
            onChange={handleOnChange}
        />
    );
}

export default SelectDate;
