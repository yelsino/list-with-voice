import fs from "fs";
import http from "http";
import https from "https";
import openai from "./openia";

async function downloadFileToFsReadStream(url: string): Promise<fs.ReadStream> {
  return new Promise<fs.ReadStream>((resolve, reject) => {
    const httpModule = url.startsWith('https://') ? https : http;

    httpModule.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(`La solicitud HTTP no tuvo éxito. Código de estado: ${response.statusCode}`);
        return;
      }

      const tempFilePath = 'tempfile.mp3';
      const fileStream = fs.createWriteStream(tempFilePath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          const fsReadStream = fs.createReadStream(tempFilePath);
          resolve(fsReadStream);
        });
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

export async function wishperTranscript(filePath: any) {
  try {
    const fsReadStream = await downloadFileToFsReadStream(filePath);

    const chatCompletion = await openai.audio.transcriptions.create({
      file: fsReadStream,
      model: 'whisper-1',
      language: 'es'
    })
    
    console.log("whisper: ", chatCompletion.text);
    
    return chatCompletion.text

  } catch (error: any) {
    console.log("whisper error: ", error);
    return ""
  }

}

