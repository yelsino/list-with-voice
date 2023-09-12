"use client";

import "regenerator-runtime/runtime";
import { IconMicrophone } from "../Icons";
import { useVoiceControl } from "@/context/voice.context";

function Voice() {
    const { startListening, listening, finalTranscript } = useVoiceControl();

    return (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-11 w-full flex justify-center bg-primary-200 py-5 sm:rounded-3xl ">
            {/* <div className="">
                <p className="text-secondary-100">FINA: {finalTranscript}</p>
            </div> */}

            <button onClick={startListening} type="button" className="">
                <div
                    className={`${
                        listening
                            ? " border-secondary-100 "
                            : "bg-primary-100 border-primary-100"
                    } p-5 relative rounded-full flex justify-center items-center transition ease-in-out duration-500 border-4`}
                >
                    <IconMicrophone />
                </div>
            </button>
        </div>
    );
}

export default Voice;
