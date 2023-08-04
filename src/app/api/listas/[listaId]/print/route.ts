import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as fs from 'node:fs';
import path from 'path';
import nodeHtmlToImage from 'node-html-to-image';

const prisma = new PrismaClient();

interface IParams {
    params: {
        listaId?: string;
    };
}

export async function GET(request: Request, { params }: IParams) {

    // const filePath = path.join(process.cwd(), 'public', 'nombre-del-archivo.extensión');
    fs.readFile('public/receipt.html', 'utf8', (err,content)=>{
        if(err){
            console.log("error", err);
            return
        }

          nodeHtmlToImage({
            html: content,
            output: './public/receipt.png',
            type: 'jpeg',
            content: {
                name: 'YELSIN CASO ALANYA'
            }
          }).then(() => console.log('The image was created successfully!'));
        
    })



        return NextResponse.json([{id: 1, nombre: "hola"}]);
    
}