'use client'
import { useVoiceControl } from "@/context/voice.context";

export const Cinta = () => {
    const { transcript } = useVoiceControl();
    return (
        <div className="  overflow-hidden text-secondary-200 whitespace-nowrap miDiv ">
            {transcript}
        </div>
    );
};
