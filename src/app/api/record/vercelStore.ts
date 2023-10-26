import { put } from "@vercel/blob";

export async function vercelUploadFile(file: ArrayBuffer| null): Promise<string> {

  if(!file) return ''

  try {
    console.log('empezando a subir...');
 
    const blob = await put('newfile.wav', file, {
      access: 'public',
    });
  
    console.log("RESULTADO", blob);
    
   
    return blob.url
  } catch (error) {
    console.log(error);
    return 'fallé';
    
  }
}