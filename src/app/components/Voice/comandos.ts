import { actualizarCliente, crearCliente, eliminarCliente } from "./comandos/cliente.comando";
import {  cerrarLista, actualizarLista, guardarLista, eliminarLista } from "./comandos/lista.comando";
import { goClientes, goGenerarLista, goInicio, goconfig, golistas } from "./comandos/pagina.comando";


const retroceder = [
    "retroceder",
    "volver atrás",
    "volver",
    "atrás",
    "back",
    "regresar",
];

const cleanvoice = ["limpiar", "borrar"];



const paginasApp = {
    nuevaLista: "/nueva-lista",
    verLista: "/ver-lista",
    imprimirLista: "/imprimir-lista",
    imprimirMultiples: "/imprimir-multiple",
};

const badResponseGPT = [
    "Lo siento",
    "como modelo",
    "soy incapaz",
    "no entiendo",
];



export const comando = {
    direccion: {
        inicio: goInicio,
        listas: golistas,
        clientes: goClientes,
        generar: goGenerarLista,
        configuracion:goconfig,
        retroceder,
    },
    lista: {
        actualizar:actualizarLista,
        cerrar:cerrarLista,
        eliminar:eliminarLista,
        crear:guardarLista,
    },
    cliente: {
        actualizar:actualizarCliente,
        eliminar:eliminarCliente,
        crear:crearCliente,
    },
    sistema: {
        limpiar_voz:cleanvoice
    }
    // retroceder,
    // cleanvoice,
    // badResponseGPT,
    // paginasApp,
};
