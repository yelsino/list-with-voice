import { DateType } from "react-tailwindcss-datepicker";

export interface SearchParams {
    startDate: DateType;
    endDate: DateType;
    page: number;
    pageSize: number;
    texto: string;
}

export interface GlobalState {
    searchParams : SearchParams
}

export interface ResponseParams<T> {
    serviceUrl?: string;
    status?: boolean;
    message?: string;
    metodo?: string;
    data: T;
}
