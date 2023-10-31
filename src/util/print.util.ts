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



export const convertirListaImagen = async (data:PrintLista) => {
    
  const print = convertListToPrint(data);
  
  const fontLink: any = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  fontLink.addEventListener('load', function () {
    const width = 800;
    const itemHeight = 50;
    const numItems = print.items.length;
    // const numItems = 5;
    const height = 400 + numItems * itemHeight + 200; // Adjust the height based on the number of items

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx: any = canvas.getContext('2d');

    // Dibujar un fondo
    ctx.fillStyle = "white"; // Color de fondo
    ctx.fillRect(0, 0, width, height);

    // Dibujar el título
    ctx.font = "bold 80px 'Dosis'";
    ctx.fillStyle = "black";

    const nombreTiendaX = (width - ctx.measureText(print.nombreTienda).width) / 2
    ctx.fillText(print.nombreTienda, nombreTiendaX, 70);

    // Dibujar Bienvenida
    ctx.font = "37px 'Dosis'";
    ctx.fillStyle = "#565656";
    const texto1X = (width - ctx.measureText(print.texto1).width) / 2
    const texto2X = (width - ctx.measureText(print.texto2).width) / 2
    ctx.fillText(print.texto1, texto1X, 120);
    ctx.fillText(print.texto2, texto2X, 160);

    // Datos del comercio
    ctx.font = "37px Dosis";
    ctx.fillText(`Fecha: ${print.fecha}`, 30, 230);
    ctx.fillText(`Cliente: ${print.nombreCliente}`, 30, 270);

    // Detalles de la compra
    ctx.font = "37px Dosis";
    let y = 370;

    ctx.fillText("Descripción", 30, y);
    ctx.fillText("Precio", 600, y);
    y += 70;

    print.items.forEach((item: any) => {

      ctx.font = "Dosis 37px";
      ctx.fillText(
        item.texto,
        30,
        y
      );

      // Dibuja el monto normalmente
      ctx.font = "37px Dosis";
      ctx.fillText(item.monto, 600, y);
      y += itemHeight;
    });

    // Dibujar el total
    ctx.font = "bold 37px Dosis";
    ctx.fillText(`Total: ${print.montoTotal}`, 30, height - 100);

    // Convertir el canvas en una imagen
    const image = new Image();
    image.src = canvas.toDataURL();

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'imagen.png';

    link.click();
  })


};