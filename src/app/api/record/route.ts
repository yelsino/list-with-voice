import { NextResponse } from "next/server";
import fs, { write } from "node:fs";
import fetch from 'cross-fetch'
import { Deepgram } from "@deepgram/sdk";
import axios from "axios";
import path from "node:path";
import { writeFile } from "node:fs/promises";

export async function POST(request: Request) {

  const data = await request.formData();
  const file = data.get('audio') as Blob;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", "new.wav");
  await writeFile(filePath, buffer);


  // CONVERTIR A VOZ
  const deepgramApiKey = "754c19bbce9d48c2839a43f436ea954a804043fd";

  const deepgram = new Deepgram(deepgramApiKey);
  let source: any = null;

  source = {
    buffer: buffer,
    mimetype: "http://127.0.0.1:3000",
  };

  // Send the audio to Deepgram and get the response
  console.log('empezando....');
  // console.time('transcripcion');
  deepgram.transcription
    .preRecorded(source, {
      smart_format: true,
      language: "es-419",
      model: "nova",
      // diarize: true,
      multichannel: true,
    detect_entities:true
      // filler_words: true
    })
    .then((response: any) => {
      console.dir(response, { depth: null });
      console.log('respuesta....');
    
      // console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
    })
    .catch((err) => {
      console.log(err);
    });



  return NextResponse.json({});
}

