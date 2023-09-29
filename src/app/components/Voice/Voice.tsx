"use client";
import { useVoiceControl } from "@/context/voice.context";
import "regenerator-runtime/runtime";
import { IconMicrophone } from "../Icons";


function Voice() {
    const { startListening, listening } = useVoiceControl();

    return (
        <div className="fixed sm:absolute bottom-0 left-1/2 transform py-3 -translate-x-1/2  bg-primary-200 w-full flex justify-center  sm:rounded-3xl select-none">
           
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
            
        </div>
    );
}

export default Voice;
