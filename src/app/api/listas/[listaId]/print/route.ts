import { NextResponse } from "next/server";
import nodeHtmlToImage from "node-html-to-image";
import { Readable } from "stream";
import { listaToPrint, obtenerLista } from "../../mapper/listas";
import { Lista } from "@/interfaces/list.interface";


interface IParams {
    params: {
        listaId?: string;
    };
}

export async function GET(request: Request, { params }: IParams) {

    try {
        const { listaId } = params;
    
        const listaBD = await obtenerLista(listaId ?? "")
        console.log('1');
        if(!listaBD) return NextResponse.json({error:'No se encontró la lista'})
    
        // console.log(JSON.stringify(listaBD));
        
        const templateHtml = await fetch('https://res.cloudinary.com/dwkfj5sxb/raw/upload/v1692990324/Templates/zv5f373tuh8j5ro5zga5.html')

        console.log('2222');
        let convertTemplate = await templateHtml.text();
        
        console.log('33333');
        const imageBuffer = await nodeHtmlToImage({
            html: convertTemplate,
            output: undefined, // Do not write the image to a file
            type: "jpeg",
            content: listaToPrint(listaBD as Lista),
        });

        console.log('44444');
        
    
        const readableStream: any = new Readable();
        readableStream.push(imageBuffer);
        readableStream.push(null);
        console.log('5555');
        const response = new NextResponse(readableStream);
        console.log("response: ", response);
        console.log('6666');
        // response.headers.set("Content-Type", "image/jpeg");
    
        return response;
    } catch (error) {
        console.log("ERROR:: ", error);
        
    }
}
