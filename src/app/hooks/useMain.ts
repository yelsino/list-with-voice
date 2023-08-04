import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    transcript: string;
    resetTranscript: () => void;
}
export const useMain = ({ transcript, resetTranscript }: Props) => {
    const pathname = usePathname();
    const { push } = useRouter();

    useEffect(() => {
      
        if (transcript.trim() === "") return;
        const newTreanscript = transcript.trim().toLowerCase();
        
    }, [pathname, transcript, push, resetTranscript]);
};
