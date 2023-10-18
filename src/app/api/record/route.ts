import { NextResponse } from "next/server";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import cloudinary from "./cloudinary";
import { transcriptLanchain } from "./lanchain";

export async function POST(request: Request) {

  console.time("GENERAR");
  // generar archivo
  const data = await request.formData();
  const file = data.get('audio') as Blob;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(__dirname, "new.wav");

  await writeFile(filePath, buffer);
  console.timeEnd("GENERAR");
  

  // subir archivo
  const upload = await cloudinary.uploader.upload(filePath,{
    resource_type: "video",
    folder: 'voices'
  });
  const urlAudio = upload.url;
  console.timeEnd("GENERAR");

  // transformar archivo
 const response =  await transcriptLanchain(urlAudio)
  return NextResponse.json({texto: response});
}

