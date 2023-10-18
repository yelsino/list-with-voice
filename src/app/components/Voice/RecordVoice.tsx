"use client";
import { IconPause, IconPlay } from "../Icons";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useConvertRecordToJsonMutation } from "@/redux/services/listaApi";
import { addItemsToList } from "@/redux/features/listaSlice";
import { mapItemToList, mapItemToList2 } from "@/interfaces/mapper";


function RecordVoice() {

    const pathName = usePathname();
    const dispatch = useAppDispatch(); 
    const [convertirRecordJson] = useConvertRecordToJsonMutation();

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

        const formData = new FormData();
        formData.append("audio", audioBlob);
  
        toast.promise(convertirRecordJson(formData).unwrap(), {
          loading: "Convirtiendo grabación...",
          error: "Error al convertir grabación",
          success: "Converción de grabación completa",
        }).then((res)=>{
          // console.log("CONVERSION RES: ");
          dispatch(addItemsToList(res))
        })
  
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



    const validRutes = ["/generar"];
    const shouldShowButton = validRutes.some((e) => pathName.startsWith(e));

    return (
        <>
            {shouldShowButton && <div className="fixed sm:absolute bottom-0 left-1/2 transform py-3 -translate-x-1/2  bg-primary-200 w-full flex justify-center  sm:rounded-3xl select-none">
                <button 
                    ref={listenButtonRef}
                    onClick={handleClick}
                    type="button" className="select-none focus:select-none">
                    <div
                        className={`${microphone
                            ? " border-secondary-100 "
                            : "bg-primary-100 border-primary-100"
                            } text-secondary-100 p-5 relative rounded-full flex justify-center items-center transition ease-in-out duration-500 border-4 select-none`}
                    >
                        {microphone ? <IconPause /> : <IconPlay />}
                    </div>
                </button>

            </div>}
        </>

    );
}

export default RecordVoice;
