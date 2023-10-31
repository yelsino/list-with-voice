import { Lista, PrintLista } from "@/interfaces/list.interface";

export function convertListToPrint(dataLit:PrintLista) {
  const { lista, tienda } = dataLit;

  return {
    fecha: dateFormat(lista.createdAt),
    montoTotal: moneyFormatSimbol(lista.montoTotal),
    nombreCliente: lista?.cliente?.nombres ?? "",
    nombreTienda: tienda.nombreTienda.toUpperCase(),
    texto1: tienda.texto1,
    texto2: tienda.texto2,
    items: lista.items.map((item: any) => {

      const texto = item.calculado ? `${item.nombre}` : `${item.cantidad} ${item.medida} ${item.nombre} ${item.precio} x und`;
      const monto = moneyFormat(item.montoItem);

      return {
        texto: texto,
        monto: monto
      }
    }),
  };

}

export const dateFormat = (value: Date | string | undefined) => {
  if (!value) {
    return ""; // Si el valor es undefined o null, se devuelve una cadena vacía
  }

  const date = typeof value === "string" ? new Date(value) : value;

  if (isNaN(date.getTime())) {
    return ""; // Si el Date resultante es inválido, se devuelve una cadena vacía
  }

  const day = date.getDate().toString().padStart(2, '0'); // Día en formato "dd"
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato "mm"
  const year = date.getFullYear(); // Año en formato "yyyy"

  const options: any = { weekday: 'long' };
  const dayOfWeek = new Intl.DateTimeFormat('es-PE', options).format(date);

  return `${dayOfWeek} ${day}/${month}/${year}`;
};

export const moneyFormatSimbol = (value: any) => {
  const numero = Number(value);
  const formater = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });
  if (typeof numero !== "number") return formater.format(0);

  return formater.format(numero);
};

export const moneyFormat = (value: any) => {
  const numero = Number(value);
  if (isNaN(numero)) return ""; // Devuelve una cadena vacía si el valor no es un número.

  // Formatea el número sin el símbolo de la moneda.
  const formattedValue = numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
};