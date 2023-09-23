import { CirculoLoader } from "@/app/components/Loader/CirculoLoader";
import { Cliente } from "@/interfaces/client.interface";
import { obtenerClientes } from "@/redux/chunks/clienteChunck";
import { seleccionarCliente } from "@/redux/features/clienteSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Combobox, Transition } from "@headlessui/react";
import {
    CheckIcon,
    UserCircleIcon,
} from "@heroicons/react/20/solid";
import {
    XMarkIcon
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

interface Props {}

export default function AutoComplete({}: Props) {
    const dispatch = useAppDispatch();
    const { cliente, clientes } = useAppSelector(
        (state) => state.clienteReducer
    );
    seleccionarCliente;

    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const filteredPeople =
        query === ""
            ? clientes
            : clientes.filter((cliente) =>
                  cliente.nombres
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .trim()
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              ) ?? [];

    const handleChange = (cliente: Cliente) => {
        dispatch(seleccionarCliente(cliente));
    };

    useEffect(() => {
        let timer: any;

        if (query.length >= 3) {
        clearTimeout(timer);
        setSearching(true);
        timer = setTimeout(() => {
            dispatch(
                obtenerClientes({
                    startDate: null,
                    endDate: null,
                    page: 1,
                    pageSize: 20,
                    texto: query,
                })
            ).finally(() => {
                setSearching(false);
            });
        }, 2000);
        }

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="z-30">
            <Combobox value={cliente} onChange={handleChange}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-primary-100 text-left shadow-md focus:outline-none ">
                        <Combobox.Input
                            readOnly
                            className="w-full border-none py-4 pl-3 pr-10 text-lg leading-5 text-secondary-100  bg-primary-100 placeholder:text-secondary-200 focus:outline-none"
                            displayValue={(person: any) => person?.nombres}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Seleccior usuario"
                        />
                        <button
                            onClick={() => {
                                setQuery("");
                                dispatch(seleccionarCliente(null));
                            }}
                            className="absolute inset-y-0 right-0 flex items-center pr-4"
                        >
                            {searching ? (
                                <CirculoLoader />
                            ) : (
                                <XMarkIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-6 px-4 text-secondary-200">
                                    Ningún resultado encontrado.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-3 px-5 ${
                                                active
                                                    ? "bg-secondary-200 text-white"
                                                    : "text-secondary-100"
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex gap-x-3">
                                                    <UserCircleIcon
                                                        width={28}
                                                        height={28}
                                                    />
                                                    <span
                                                        className={`block truncate `}
                                                    >
                                                        {person.nombres}
                                                    </span>
                                                </div>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
