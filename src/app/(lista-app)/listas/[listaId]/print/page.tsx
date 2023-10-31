'use client'
import { convertListToPrint } from "@/util/print.util";
import { getSession } from "next-auth/react";
import axios from "axios";
import { URLBASE } from "@/interfaces/constantes";


interface IParams {
  listaId: string;
}

async function obtenerLista(listaId: string) {
  const response = await axios.get(`${URLBASE.LOCAL}/listas/${listaId}`);
  // console.log("response:0", response.data);

  return response.data
}


const PrintPage = async ({ params }: { params: IParams }) => {

  const session: any = await getSession();
  if (!session) return;

  
  
  const handleClick = async () => {
    
    const lista: any = await obtenerLista(params.listaId);

    const print = convertListToPrint({
      tienda: session.user.tienda,
      lista: lista
    })


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

  return (
    <div>
      <button onClick={handleClick}>Generar Imagen y Descargar</button>
    </div>
  );
}

export default PrintPage;