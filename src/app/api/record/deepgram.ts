const { Deepgram } = require("@deepgram/sdk");

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

export const deepgramTranscript = async (filePath:string) => {
  console.log("filePath", filePath);
  
  try {
    const deepgram = new Deepgram(deepgramApiKey);
    const source = {
      url: filePath,
    };

    const transcription = await deepgram.transcription.preRecorded(source, {
      smart_format: true,
      model: "nova",
      language: "es-419",
    });

    const texto:string = transcription.results.channels[0].alternatives[0].transcript;
    console.log("deepgram: ", texto);
    

    return texto;
  } catch (error) {
    console.log("deepgram error:", error);
    return "";
  }
};
