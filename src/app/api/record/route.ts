import { NextResponse } from "next/server";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import cloudinary from "./cloudinary";
import { transcriptLanchain } from "./lanchain";
import { transcribe } from "./wishper";
import { completion } from "./completion";
import { mapItemToList2 } from "@/interfaces/mapper";

export async function POST(request: Request) {

  // generar archivo
  const data = await request.formData();
  const file = data.get('audio') as Blob;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(__dirname, "new.wav");
  await writeFile(filePath, buffer);

  // transcript
  const textFile = await transcribe(filePath);
  console.log("TRANSCRIPT: ", textFile);
  

  // convert
  const itemsgpt = await completion(textFile ?? "");
  console.log("itemsgpt:", itemsgpt);
  console.log("itemsgpt:", typeof itemsgpt);
  
  const itemsList =itemsgpt.map((item)=>mapItemToList2(item))

  return NextResponse.json(itemsList);
}

