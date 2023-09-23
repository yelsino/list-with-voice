"use client";
import { useVoiceControl } from "@/context/voice.context";
import "regenerator-runtime/runtime";
import { IconMicrophone } from "../Icons";
import ButtonBack from "../ButtonBack";

function Voice() {
    const { startListening, listening, finalTranscript } = useVoiceControl();

    return (
        <div className="fixed bottom-0 left-1/2 transform py-2 -translate-x-1/2  w-full flex justify-center bg-primary-200  sm:rounded-3xl select-none">
            {/* <div className="">
                <p className="text-secondary-100">FINA: {finalTranscript}</p>
            </div> */}

            <button  onClick={startListening} type="button" className="select-none focus:select-none">
                <div
                    className={`${
                        listening
                            ? " border-secondary-100 "
                            : "bg-primary-100 border-primary-100"
                    } p-5 relative rounded-full flex justify-center items-center transition ease-in-out duration-500 border-4 select-none`}
                >
                    <IconMicrophone />
                </div>
            </button>
            <ButtonBack />
        </div>
    );
}

export default Voice;
