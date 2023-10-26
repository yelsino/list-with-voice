import { Service } from "@/interfaces/global.interface";
import { mapItemToList2 } from "@/interfaces/mapper";
import { NextResponse } from "next/server";
import { assemblyTranscript } from "./assembly";
import { completion } from "./completion";
import { deepgramTranscript } from "./deepgram";
import { vercelUploadFile } from "./vercelStore";
import { wishperTranscript } from "./wishper";

// recibe audio y convierte a items json
export async function POST(request: Request) {

  const data = await request.formData();
  const file = data.get('audio') as Blob;
  const audioUrl = data.get('audio_url') as string;
  const service = data.get('service') as Service;

  const createBuffer = async (file:Blob) => {
    if(!file) return null
    const bytes = await file.arrayBuffer();
    return Buffer.from(bytes);
  }

  const buffer = await createBuffer(file)
 
  const getUriUpload = async () => {
    if(audioUrl) return audioUrl
    return await vercelUploadFile(buffer)
  }

  const uriUploaded = await getUriUpload();

  const getTranscript = async () => {
    switch (service) {
      case Service.Deepgram:
        return await deepgramTranscript(uriUploaded);
      case Service.Assembly:
        return await assemblyTranscript(uriUploaded);
      case Service.Whisper:
        return await wishperTranscript(uriUploaded)
      default:
        return ""
    }
  }

  const transcription = await getTranscript();

  const itemsgpt = await completion(transcription ?? "");

  const itemsList = itemsgpt.map((item) => mapItemToList2(item));

  return NextResponse.json({
    items: itemsList,
    recordUrl: uriUploaded
  });
}

