'use client'
import { enviarVoz } from "@/redux/chunks/listaChunk";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const ButtonVoz = (): JSX.Element => {
  const [microphone, setMicrophone] = useState<MediaRecorder | null>(null);
  const listenButtonRef = useRef<HTMLButtonElement>(null);

  const getMicrophone = async (): Promise<MediaRecorder> => {
    const config = { audio: true };
    const userMedia = await navigator.mediaDevices.getUserMedia(config);

    return new MediaRecorder(userMedia);
  };

  const closeMicrophone = async (microphone: MediaRecorder) => {
    microphone.stop();
  };

  const openMicrophone = async (microphone: MediaRecorder) => {
    await microphone.start(500);

    microphone.onstart = () => console.log("mic open");
    microphone.onstop = () => console.log("mic closed");

    const chunks: BlobPart[] = [];
    microphone.ondataavailable = (e) => chunks.push(e.data);

    microphone.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });

      // const audioUrl = URL.createObjectURL(audioBlob);

      toast.promise(enviarVoz(audioBlob), {
        loading: "Actualizando...",
        error: "Error al actualizar",
        success: "Acutalización completa",
      });

      // console.log("AUDIO URL: ", audioUrl);

      // const downloadLink = document.createElement("a");
      // downloadLink.href = audioUrl;
      // downloadLink.download = "recording.wav";
      // downloadLink.click();
    };
  };

  const handleClick = async () => {
    if (!microphone) {
      const mic = await getMicrophone();
      setMicrophone(mic);
      await openMicrophone(mic);
    } else {
      await closeMicrophone(microphone);
      setMicrophone(null);
    }
  };

  return (
    <button
      ref={listenButtonRef}
      className="text-secondary-100 border border-secondary-100 rounded-full w-32 h-32"
      onClick={handleClick}
    >
      {microphone ? "APAGAR" : "ENCENDER"}
    </button>
  );
};

export default ButtonVoz;
