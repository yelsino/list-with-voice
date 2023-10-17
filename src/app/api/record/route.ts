import { NextResponse } from "next/server";
import fs, { write } from "node:fs";
import fetch from 'cross-fetch'
import { Deepgram } from "@deepgram/sdk";
import axios from "axios";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import cloudinary from "./cloudinary";
import { assembly } from "./assembly";

export async function POST(request: Request) {


  // generar archivo
  const data = await request.formData();
  const file = data.get('audio') as Blob;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(__dirname, "new.wav");

  await writeFile(filePath, buffer);

  // subir archivo
  const upload = await cloudinary.uploader.upload(filePath,{
    resource_type: "video",
    folder: 'voices'
  });
  const urlAudio = upload.url;

  // transformar archivo
  const assembly_params = {
    audio_url: urlAudio,
    speaker_labels: true,
    language_code: 'es'
  }

  const transcript:any = await assembly.transcripts.create(assembly_params);

  let texto = ""
  for (let utterance of transcript.utterances) {
    console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
    texto = utterance.text
  }

  // const responses = transcript.utterances.text

  console.log(texto);

  

  return NextResponse.json({});
}

