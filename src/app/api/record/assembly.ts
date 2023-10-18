import AssemblyAI from 'assemblyai';

export const assembly = new AssemblyAI({
  apiKey: process.env.API_KEY_ASSEMBLY,
});



// const assembly_params = {
  //   audio_url: urlAudio,
  //   speaker_labels: true,
  //   language_code: 'es'
  // }

  // const transcript:any = await assembly.transcripts.create(assembly_params);
  // console.timeEnd("GENERAR");

  // let texto = ""
  // for (let utterance of transcript.utterances) {
  //   console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
  //   texto = utterance.text
  // }