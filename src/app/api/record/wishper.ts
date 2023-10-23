import fs from "fs";
import openai from "./openia";

export async function wishperTranscript(filePath: string) {
  try {
  
    const newFile = fs.createReadStream(filePath)
    const chatCompletion = await openai.audio.transcriptions.create({
      file: newFile,
      model: 'whisper-1',
      language: 'es'
    })
    
    console.log("TRANSCRIBE RESULT: ", chatCompletion.text);
    
    return chatCompletion.text

  } catch (error: any) {
    console.log("ERROR: ", error);
  }

}