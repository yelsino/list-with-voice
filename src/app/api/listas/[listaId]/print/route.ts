import { NextResponse } from "next/server";
import nodeHtmlToImage from "node-html-to-image";
import { Readable } from "stream";
import { listaToPrint, obtenerLista } from "../../mapper/listas";
import { Lista } from "@/interfaces/list.interface";
import puppeteer from "puppeteer";
import * as phantom from "phantom";

interface IParams {
    params: {
        listaId?: string;
    };
}
export async function GET(request: Request, { params }: IParams) {
    try {
        const { listaId } = params;

        const listaBD = await obtenerLista(listaId ?? "");
        if (!listaBD)
            return NextResponse.json({ error: "No se encontró la lista" });

        // console.log(JSON.stringify(listaBD));
        const instance: any = await phantom.create();
        const page: any = await instance.createPage();
        const status: string = await page.open("https://phantomjs.org/screen-capture.html");
        const content = await page.property('content');
        console.log(content);
        await instance.exit();

        return NextResponse.json({});
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
