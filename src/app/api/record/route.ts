import { NextResponse } from "next/server";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { completion } from "./completion";
import { mapItemToList2 } from "@/interfaces/mapper";
import { deepgramTranscript } from "./deepgram";

export async function POST(request: Request) {

  // generar archivo
  const data = await request.formData();
  const file = data.get('audio') as Blob;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(__dirname, "new.wav");
  await writeFile(filePath, buffer);
  // transcript
  // const textFile = await wishperTranscript(filePath);
  const textFile = await deepgramTranscript(filePath);
  
  const itemsgpt = await completion(textFile ?? "");
  console.log("ITEMS GPT: ", itemsgpt);
  
  const itemsList =itemsgpt.map((item)=>mapItemToList2(item));

  return NextResponse.json(itemsList);
}

