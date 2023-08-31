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

