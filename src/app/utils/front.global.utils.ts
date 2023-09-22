import dayjs from "dayjs";

export const generarTextoFecha = (startDateStr: any, endDateStr: any) => {
    // Convertir las cadenas de texto en objetos dayjs
    if (!startDateStr && !endDateStr) return "De todos los tiempos";
    
    const startDate = dayjs(startDateStr);
    const endDate = dayjs(endDateStr);

    const today = dayjs();
    const diffDays = endDate.diff(startDate, "day");

    if (today.isSame(startDate, "day") && today.isSame(endDate, "day")) {
        return "De hoy";
    } else if (
        diffDays === 2 ||
        (diffDays === 3 && today.isSame(endDate, "day"))
    ) {
        return "De los últimos 3 días";
    } else if (
        diffDays === 6 ||
        (diffDays === 7 && today.isSame(endDate, "day"))
    ) {
        return "De los últimos 7 días";
    } else if (
        today.isSame(startDate, "week") &&
        today.isSame(endDate, "week")
    ) {
        return "De esta semana";
    } else if (
        startDate.isSame(today.startOf("month"), "day") &&
        endDate.isSame(today.endOf("month"), "day")
    ) {
        return "De este mes";
    } else if (
        startDate.isSame(today.startOf("month"), "day") &&
        endDate.isSame(today.subtract(1, "day"))
    ) {
        return "De este mes";
    } else if (
        startDate.isSame(today.subtract(1, "month").startOf("month"), "day") &&
        endDate.isSame(today.subtract(1, "month").endOf("month"), "day")
    ) {
        return "Del mes pasado";
    } else {
        return `${startDate.format("DD-MM-YYYY")} a ${endDate.format(
            "DD-MM-YYYY"
        )}`;
    }
};
