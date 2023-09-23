import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import toast from "react-hot-toast";

interface Props {
    children: React.ReactNode;
    imprimirLista: () => void;
    actualizarLista: () => void;
}

export default function OptionsMenu({
    children,
    imprimirLista,
    actualizarLista,
}: Props) {
    const solutions = [
        {
            name: "Imprimir",
            description: "Recibir impreción tamaño ticket",
            href: "##",
            icon: IconOne,
            onClick: () => imprimirLista(),
        },
        {
            name: "Actualizar",
            description: "Cambiar datos de la lista",
            href: "##",
            icon: IconTwo,
            onClick: () => actualizarLista(),
        },
        {
            name: "Eliminar",
            description: "Eliminar lista de base de datos",
            href: "##",
            icon: IconThree,
            onClick: () => actualizarLista(),
        },
    ];

    return (
        <Popover className="w-full h-full">
            {({ open }) => (
                <>
                    <Popover.Button className=" w-full h-full">
                        {children}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute  right-1/2 z-10 top-0 -translate-y-9  w-screen max-w-sm  transform px-4 sm:px-0 lg:max-w-3xl translate-x-11 mt-1 box-border">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-8 bg-primary-200 p-7 lg:grid-cols-2">
                                    {solutions.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            onClick={item.onClick}
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                <item.icon aria-hidden="true" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-secondary-100">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-secondary-200">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                                <Popover.Button className="bg-primary-100 p-4 w-full">
                                    <a
                                        href="##"
                                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out  focus:outline-none focus-visible:ring "
                                    >
                                        <span className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-secondary-200">
                                                Cerrar menú
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    fillRule="evenodd"
                                                    d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </a>
                                </Popover.Button>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}

function IconOne() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#1c2a37" />
            <path
                d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
                stroke="#FB923C"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
        </svg>
    );
}

function IconTwo() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#1c2a37" />
            <path
                d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
                stroke="#FB923C"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
        </svg>
    );
}

function IconThree() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#1c2a37" />
            <g transform="translate(10, 12)">
                <path
                    stroke="#FB923C"
                    strokeWidth="2"
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M4.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H-3.916a3 3 0 01-2.991-2.77L-7.913 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 01-4.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C1.39 3.05 2 3.684 2 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    transform="translate(14.25, 0)"
                />
            </g>
        </svg>
    );
}
