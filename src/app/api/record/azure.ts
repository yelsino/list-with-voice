import sdk from 'microsoft-cognitiveservices-speech-sdk';
import fs from 'node:fs'

var subscriptionKey = process.env.AZURE_KEY_SUSCRIPTION ?? "";
var serviceRegion = process.env.AZURE_REGION ?? "";
// var filename = "YourAudioFile.wav";
 
export const azureTranscript = (filePath:string) => {
   // create the push stream we need for the speech sdk.
   var pushStream = sdk.AudioInputStream.createPushStream();
  
   // open the file and push it to the push stream.
   fs.createReadStream(filePath).on('data', function(arrayBuffer:Buffer) {
     // pushStream.write(arrayBuffer.subarray ());
     pushStream.write(arrayBuffer.slice());
   }).on('end', function() {
     pushStream.close();
   });
   
   
   // now create the audio-config pointing to our stream and
   // the speech config specifying the language.
   var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
   var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
   
   // setting the recognition language to English.
   speechConfig.speechRecognitionLanguage = "es";
   
   // create the speech recognizer.
   var recognizer:any = new sdk.SpeechRecognizer(speechConfig, audioConfig);
   
   // start the recognizer and wait for a result.
   recognizer.recognizeOnceAsync(
     function (result:any) {
       console.log(result);
   
       recognizer.close();
       recognizer = undefined;
     },
     function (err:any) {
       console.trace("err - " + err);
   
       recognizer.close();
       recognizer = undefined;
     });
 
}