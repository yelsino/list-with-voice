interface Props {
    startDate: string | null;
    endDate: string | null;
    skip: number;
    take: number;
    textfilter: string
}

export const createSearchParams = (params: URLSearchParams): Props => {
    console.log("params: ", params);
    
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const page = params.get("page");
    const pageSize = params.get("pageSize");
    const textfilter = params.get("texto");

    // Convierte la página y el tamaño de página en números
    const pageNumber = parseInt(page || "1", 10);
    const pageSizeNumber = parseInt(pageSize || "10", 10);

    const skip = (pageNumber - 1) * pageSizeNumber;

    return {
        startDate: startDate,
        endDate: endDate,
        skip: skip,
        take: pageSizeNumber,
        textfilter: textfilter ?? ""
    };
};

export const dateStringToStringISO = (
    input: string | null,
    useEndTime: boolean = false
): string | undefined => {
    // Verifica si el formato de entrada es válido (YYYY-MM-DD).
    if (!input) return undefined;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(input)) {
        return undefined;
    }

    try {
        if (useEndTime) {
            // Utiliza la última hora del día.
            const fecha = new Date(input + "T23:59:59.999Z");
            return fecha.toISOString();
        } else {
            // Utiliza la primera hora del día.
            const fecha = new Date(input + "T00:00:00.000Z");
            return fecha.toISOString();
        }
    } catch (error) {
        console.error("Error al convertir la fecha:", error);
        return undefined;
    }
};
