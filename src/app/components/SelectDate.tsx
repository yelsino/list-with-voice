import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format, subDays, startOfWeek, endOfWeek} from 'date-fns';

function SelectDate() {
    const [value, setValue] = useState({
      startDate: format(subDays(new Date(), 7), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    };

    return (
        <Datepicker
            i18n={"es"}
            primaryColor={"orange"}
            displayFormat={"DD/MM/YYYY"}
            separator={"a"} 
            showShortcuts={true}
            configs={
              {
                  shortcuts: {
                      today: "Hoy",
                      yesterday: "Ayer",
                      last3Days: {
                          text: "Ultimos 3 dias",
                          period: {
                              start: format(subDays(new Date(), 3), "yyyy-MM-dd"),
                              end: format(new Date(), "yyyy-MM-dd")
                          }
                      },
                      last7Days: {
                          text: "Ultimos 7 dias",
                          period: {
                              start: format(subDays(new Date(), 7), "yyyy-MM-dd"),
                              end: format(new Date(), "yyyy-MM-dd")
                          }
                      },
                      currentWeek: {
                          text: "Esta semana",
                          period: {
                              start: format(startOfWeek(new Date()), "yyyy-MM-dd"),
                              end: format(endOfWeek(new Date()), "yyyy-MM-dd")
                          }
                      },
                      currentMonth: "Este mes",
                      pastMonth: "Mes pasado",
                  },
              } as any
          }
            value={value}
            onChange={handleValueChange}
        />
    );
}

export default SelectDate;
