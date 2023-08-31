import { NextResponse } from "next/server";
import { Readable } from "stream";
import * as fs from "fs";
import { createCanvas, loadImage } from "canvas";

interface IParams {
    params: {
        listaId?: string;
    };
}
export async function GET(request: Request, { params }: IParams) {
    try {
        const { listaId } = params;

        const data = {
            // ... (tus datos aquí)
        };

        const width = 800;
        const height = 600;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Dibujar un fondo
        ctx.fillStyle = "white"; // Color de fondo
        ctx.fillRect(0, 0, width, height);

        // Dibujar el título
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Lista de Compras", 50, 50);

        // Dibujar los detalles
        let y = 100;
        [1, 2, 3].forEach((item) => {
            ctx.font = "18px Arial";
            ctx.fillText(`items de lista numero 1`, 50, y);
            y += 30; // Aumentar la posición vertical
        });

        // Dibujar el total
        ctx.font = "bold 20px Arial";
        ctx.fillText(`Total: 500 soles`, 50, y + 20);

        // Guardar la imagen generada en un archivo
        // const out = fs.createWriteStream("lista-de-compras.png");
        // const stream = canvas.createPNGStream();
        // stream.pipe(out);
        // out.on("finish", () => console.log("Imagen generada."));

        // Convertir el canvas a un buffer (blob-like)
        //  const buffer = canvasToBuffer(canvas, "image/png");

        //  // Responder con el buffer al frontend
        //  const response = new NextResponse(buffer, {
        //      headers: {
        //          "Content-Type": "image/png",
        //      },
        //  });

        //  return response;


        const buffer = await new Promise<Buffer>((resolve, reject) => {
            canvas.toBuffer((err, buf) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buf);
                }
            });
        });

        const response = new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/png",
            },
        });

        return response;
       
    } catch (error) {
        console.log("ERROR::  ", error);
        if (error) {
            NextResponse.json(error);
        }
    }
}

// export async function GET(request: Request, { params }: IParams) {

//     const { listaId } = params;

//     const listaBD = await obtenerLista(listaId ?? "")

//     if(!listaBD) return NextResponse.json({error:'No se encontró la lista'})

//     // console.log(JSON.stringify(listaBD));

//     const filePath = path.resolve(__dirname, '..', '..', '..','..', '..','..','..','public', 'receipt.html');
//     console.log("filePath",filePath);

//     fs.readdir(filePath, (err,files)=>{
//         if(err) {
//             console.log('error al leer');

//         }

//         console.log(files);

//     })

//     // console.log('ruta completa:', rutaCompleta);

//     const content = await fs.promises.readFile(filePath, "utf8");

//     const imageBuffer = await nodeHtmlToImage({
//         html: content,
//         output: undefined, // Do not write the image to a file
//         type: "jpeg",
//         content: listaToPrint(listaBD as Lista),
//     });

//     const readableStream: any = new Readable();
//     readableStream.push(imageBuffer);
//     readableStream.push(null);

//     const response = new NextResponse(readableStream);
//     response.headers.set("Content-Type", "image/jpeg");

//     return response;
// }
