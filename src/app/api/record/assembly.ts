import AssemblyAI from 'assemblyai';

export const assembly = new AssemblyAI({
  apiKey: process.env.API_KEY_ASSEMBLY,
});


export const assemblyTranscript = async (filePath: string) => {
  try {
    console.log("assembly inicio");
    
    const assembly_params = {
      audio_url: filePath,
      speaker_labels: true,
      language_code: 'es'
    }

    const transcript: any = await assembly.transcripts.create(assembly_params);

    let texto = ""
    for (let utterance of transcript.utterances) {
      texto = utterance.text
    }
    console.log("assembly: ", texto);
    return texto
  } catch (error) {
    console.log("assembly error: ", error);
    return "";
  }

}