const fs = require("fs");
const { Deepgram } = require("@deepgram/sdk");

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

const mimetype = "audio/wav";

export const deepgramTranscript = async (filePath = "") => {
  try {
    const deepgram = new Deepgram(deepgramApiKey);
    const audio = fs.readFileSync(filePath);
    const source = {
      buffer: audio,
      mimetype: mimetype,
    };

    const transcription = await deepgram.transcription.preRecorded(source, {
      smart_format: true,
      model: "nova",
      language: "es",
    });

    const texto:string = transcription.results.channels[0].alternatives[0].transcript;
    console.log("deepgram: ", texto);
    

    return texto;
  } catch (error) {
    console.log(error);
    return "";
  }
};
