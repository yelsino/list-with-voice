import { NextResponse } from "next/server";
import nodeHtmlToImage from "node-html-to-image";
import { Readable } from "stream";
import { listaToPrint, obtenerLista } from "../../mapper/listas";
import { Lista } from "@/interfaces/list.interface";
import * as fs from "node:fs";
import path from "path";

interface IParams {
    params: {
        listaId?: string;
    };
}

export async function GET(request: Request, { params }: IParams) {

    try {
        const { listaId } = params;
    
        const listaBD = await obtenerLista(listaId ?? "")
        if(!listaBD) return NextResponse.json({error:'No se encontró la lista'})
    
        // console.log(JSON.stringify(listaBD));
        
        const templateHtml = await fetch('https://res.cloudinary.com/dwkfj5sxb/raw/upload/v1692990324/Templates/zv5f373tuh8j5ro5zga5.html')

        let convertTemplate = await templateHtml.text();
        console.log('convertTemplate:::: ', convertTemplate);
        console.log('22222');
        const imageBuffer = await nodeHtmlToImage({
            html: convertTemplate,
            output: undefined, 
            type: "jpeg",
            content: listaToPrint(listaBD as Lista),
        });
        console.log('44444');
        
        const readableStream: any = new Readable();
        readableStream.push(imageBuffer);
        readableStream.push(null);

        const response = new NextResponse(readableStream);
        console.log("response: ", response);
        // response.headers.set("Content-Type", "image/jpeg");
    
        return response;
    } catch (error) {
        console.log("ERROR:: ", error);
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