'use client';
import { useState } from "react";
import useLLM from "usellm";

export default function AudioRecorder() {
  const [audioUrl, setAudioUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("");

  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

  const startRecording = async () => {
    await llm.record();
    setStatus("Recording...");
  };

  const stopRecording = async () => {
    const { audioUrl } = await llm.stopRecording();
    setAudioUrl(audioUrl);
    setStatus("");
  };

  const transcribe = async () => {
    setStatus("Transcribing...");
    const { text } = await llm.transcribe({ audioUrl });
    setTranscript(text);
    setStatus("");
  };

  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-cyan-300">
     <div className="flex gap-x-3 ">
     <button onClick={startRecording}>Record</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={transcribe}>Transcribe</button>
     </div>
      <p>{status}</p>
      {audioUrl && <audio src={audioUrl} controls />}
      {transcript && <p>Transcript: {transcript}</p>}
    </div>
  );
}