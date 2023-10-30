'use client'

import { convertListToPrint } from "@/util/print.util";




const PrintFile = () => {

    // const DATA: any = {
    //     "lista": {
    //         "id": "653d7d945eeb13168c4c67cc",
    //         "clienteId": "653ac480a66f1266efc16415",
    //         "numero": 5,
    //         "abonos": [],
    //         "montoTotal": 14,
    //         "pagado": false,
    //         "completado": true,
    //         "createdAt": "2023-10-28T21:31:00.149Z",
    //         "updatedAt": "2023-10-28T21:31:00.149Z",
    //         "items": [
    //             {
    //                 "id": "653d7d945eeb13168c4c67cd",
    //                 "listaId": "653d7d945eeb13168c4c67cc",
    //                 "nombre": "papa",
    //                 "precio": 0,
    //                 "cantidad": 0,
    //                 "montoItem": 2.6,
    //                 "medida": "und",
    //                 "texto": "2 soles 60 de papa",
    //                 "calculado": true,
    //                 "createdAt": "2023-10-28T21:31:00.149Z",
    //                 "updatedAt": "2023-10-28T21:31:00.149Z"
    //             },
    //             {
    //                 "id": "653d7d945eeb13168c4c67ce",
    //                 "listaId": "653d7d945eeb13168c4c67cc",
    //                 "nombre": "lechuga",
    //                 "precio": 0,
    //                 "cantidad": 0,
    //                 "montoItem": 1.5,
    //                 "medida": "und",
    //                 "texto": "1 sol 50 de lechuga",
    //                 "calculado": true,
    //                 "createdAt": "2023-10-28T21:31:00.149Z",
    //                 "updatedAt": "2023-10-28T21:31:00.149Z"
    //             },
    //             {
    //                 "id": "653d7d945eeb13168c4c67cf",
    //                 "listaId": "653d7d945eeb13168c4c67cc",
    //                 "nombre": "cebolla china",
    //                 "precio": 0,
    //                 "cantidad": 0,
    //                 "montoItem": 1,
    //                 "medida": "und",
    //                 "texto": "1 sol de cebolla china",
    //                 "calculado": true,
    //                 "createdAt": "2023-10-28T21:31:00.149Z",
    //                 "updatedAt": "2023-10-28T21:31:00.149Z"
    //             },
    //             {
    //                 "id": "653d7d945eeb13168c4c67d0",
    //                 "listaId": "653d7d945eeb13168c4c67cc",
    //                 "nombre": "zanahoria",
    //                 "precio": 0,
    //                 "cantidad": 0,
    //                 "montoItem": 2.2,
    //                 "medida": "und",
    //                 "texto": "2 soles 20 de zanahoria",
    //                 "calculado": true,
    //                 "createdAt": "2023-10-28T21:31:00.149Z",
    //                 "updatedAt": "2023-10-28T21:31:00.149Z"
    //             },
    //             {
    //                 "id": "653d7d945eeb13168c4c67d1",
    //                 "listaId": "653d7d945eeb13168c4c67cc",
    //                 "nombre": "alberca",
    //                 "precio": 0,
    //                 "cantidad": 0,
    //                 "montoItem": 2,
    //                 "medida": "und",
    //                 "texto": "2 soles de alberca",
    //                 "calculado": true,
    //                 "createdAt": "2023-10-28T21:31:00.149Z",
    //                 "updatedAt": "2023-10-28T21:31:00.149Z"
    //             },
    //             {
    //                 "id": "653d7d945eeb13168c4c67d2",
    //                 "listaId": "653d7d945eeb13168c4c67cc",
    //                 "nombre": "papa segunda",
    //                 "precio": 0,
    //                 "cantidad": 0,
    //                 "montoItem": 4.7,
    //                 "medida": "und",
    //                 "texto": "4 soles 70 de papa segunda",
    //                 "calculado": true,
    //                 "createdAt": "2023-10-28T21:31:00.149Z",
    //                 "updatedAt": "2023-10-28T21:31:00.149Z"
    //             }
    //         ],
    //         "cliente": {
    //             "id": "653ac480a66f1266efc16415",
    //             "usuarioId": "653ac480a66f1266efc16413",
    //             "nombres": "cliente tienda",
    //             "celular": "",
    //             "createdAt": "2050-01-01T00:00:00.000Z",
    //             "updatedAt": "2023-10-26T19:56:48.612Z"
    //         },
    //         "errors": []
    //     },
    //     "tienda": {
    //         "id": "653ac480a66f1266efc16414",
    //         "usuarioId": "653ac480a66f1266efc16413",
    //         "nombreTienda": "tienda",
    //         "logo": "",
    //         "ubicacion": "",
    //         "texto1": "Bienvenido a nuestro negocio",
    //         "texto2": "de frutas y verduras",
    //         "numeroContacto": "",
    //         "email": "",
    //         "referencia": "",
    //         "urlTienda": "",
    //         "codigoQr": false,
    //         "codigoBarra": false,
    //         "createdAt": "2023-10-26T19:56:48.541Z",
    //         "updatedAt": "2023-10-26T19:56:48.541Z"
    //     }
    // }
    

    const handleClick = async () => {
        // Crear un elemento de canvas
        // const dataPrint = convertListToPrint(DATA);

        // const fontLink: any = document.createElement('link');
        // fontLink.href = 'https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600&display=swap';
        // fontLink.rel = 'stylesheet';
        // document.head.appendChild(fontLink);

        // fontLink.addEventListener('load', function () {
           
        // });

        const width = 800;
        const itemHeight = 50;
        const numItems = 20;
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

        const nombreTiendaX = (width - ctx.measureText("TIENDA YOLA").width) / 2
        ctx.fillText("TIENDA YOLA", nombreTiendaX, 70);

        // // Dibujar Bienvenida
        // ctx.font = "37px 'Dosis'";
        // ctx.fillStyle = "#565656";
        // const texto1X = (width - ctx.measureText(dataPrint.texto1).width) / 2
        // const texto2X = (width - ctx.measureText(dataPrint.texto2).width) / 2
        // ctx.fillText(dataPrint.texto1, texto1X, 120);
        // ctx.fillText(dataPrint.texto2, texto2X, 160);

        // // Datos del comercio
        // ctx.font = "37px Dosis";
        // ctx.fillText(`Fecha: ${dataPrint.fecha}`, 30, 230);
        // ctx.fillText(`Cliente: ${dataPrint.nombreCliente}`, 30, 270);

        // // Detalles de la compra
        // ctx.font = "37px Dosis";
        // let y = 370;

        // ctx.fillText("Descripción", 30, y);
        // ctx.fillText("Precio", 600, y);
        // y += 70;

        // dataPrint.items.forEach((item) => {

        //     ctx.font = "Dosis 37px";
        //     ctx.fillText(
        //         item.texto,
        //         30,
        //         y
        //     );

        //     // Dibuja el monto normalmente
        //     ctx.font = "37px Dosis";
        //     ctx.fillText(item.monto, 600, y);
        //     y += itemHeight;
        // });

        // // Dibujar el total
        // ctx.font = "bold 37px Dosis";
        // ctx.fillText(`Total: ${dataPrint.montoTotal}`, 30, height - 100);

        // Convertir el canvas en una imagen
        const image = new Image();
        image.src = canvas.toDataURL();

        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'imagen.png';

        // Simular un clic en el enlace para descargar automáticamente la imagen
        link.click();


    };

    return (
        <div>
            <button onClick={handleClick}>Generar Imagen y Descargar</button>
        </div>
    );
}

export default PrintFile;