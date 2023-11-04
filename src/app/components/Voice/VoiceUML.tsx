'use client';
import useLLM from "usellm";
import React, { useEffect, useState } from "react";
import { IconPause, IconPlay } from "../Icons";
import { usePathname } from "next/navigation";
import useCreateItems from "@/app/hooks/useCreateItems";

type RecordStatus = | 'recording' | 'stop' | 'transcribing'

// solo debe generar el audio
export default function AudioRecorder() {

  const pathName = usePathname();
  const [audioUrl, setAudioUrl] = useState("");
  const [status, setStatus] = useState<RecordStatus>("stop");

  const {toastTextToItems, toastTranscription, toasTextoToProductos} = useCreateItems()

  // convertTextToJson

  const llm = useLLM({ serviceUrl: "/api/llm" });

  const startRecording = async () => {
    await llm.record();
    setStatus("recording");
  };

  const stopRecording = async () => {
    const { audioUrl } = await llm.stopRecording();

    setAudioUrl(audioUrl);
    setStatus("stop");
   
  };

  const transcribe = async () => {
    const transcript:string = await toastTranscription(audioUrl);

    switch (pathName) {
      case "/generar":
        toastTextToItems(transcript);
        break;
      case "/precios":
        toasTextoToProductos(transcript);
        break;
    
      default:
        break;
    }
    setStatus("stop");
  };

  const handleClick = async () => {
    if (status === "stop") {
      await startRecording();
    }
    if (status === "recording") {
      await stopRecording()
    }

  };

  const validRutes = ["/generar","/precios"];
  const shouldShowButton = validRutes.some((e) => pathName.startsWith(e));

  useEffect(() => {
    if (audioUrl) {
      transcribe()
    }
  }, [audioUrl])

  return (
    <>
      {
        shouldShowButton && <div className="fixed sm:absolute bottom-0 left-1/2 transform py-3 -translate-x-1/2  bg-primary-200 w-full flex justify-center  sm:rounded-3xl select-none">
          <button
            onClick={handleClick}
            type="button"
            className="select-none focus:select-none"
          >
            <div
              className={`${status === "recording"
                ? " border-secondary-100 "
                : "bg-primary-100 border-primary-100"
                } text-secondary-100 p-5 relative rounded-full flex justify-center items-center transition ease-in-out duration-500 border-4 select-none`}
            >
              {status === "recording" ? <IconPause /> : <IconPlay />}
            </div>
          </button>
          {/* {audioUrl && <audio className="mb-4" src={audioUrl} controls />} */}
        </div>
      }
    </>
  );
}
