import { Voice, VoiceState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VoiceState = {
    transcriptState: "",
    voices: [],
    calculated: false,
    voiceSelected: null,
};

export const voiceSlice = createSlice({
    name: "voices",
    initialState,
    reducers: {
        addVoicesToList: (state, action: PayloadAction<string[]>) => {
            // filtrar todas las voces que no esten en el payload
            const missingVoices: string[] = action.payload.filter(
                (text) => !state.voices.some((voice) => voice.voz === text)
            );

            if (missingVoices.length === 0) return;

            // si hay un voice seleccionado entonces actualizarlo
            if (state.voiceSelected) {
                const index = state.voiceSelected.index as number;

                const newVoice: Voice = {
                    voz: missingVoices[0],
                    status: "pending",
                    enviado: false,
                    index: index,
                };

                const newVoices = state.voices.map((voice) => {
                    if (voice.index === index) {
                        return newVoice;
                    }
                    return voice;
                });
                state.voices = newVoices;
                state.voiceSelected = null;
                return;
            }

            // crear un array de voces con el status pending
            const newVoices: Voice[] = missingVoices.map((text) => ({
                voz: text,
                status: "pending",
                enviado: false,
                index: state.voices.length + 1,
            }));

            state.voices = [...state.voices, ...newVoices];
        },
        updateVoice: (state, action: PayloadAction<Voice>) => {
            state.voices = state.voices.map((voice) => {
                if (voice.index === action.payload.index) {
                    return {
                        ...voice,
                        status: action.payload.status,
                        enviado: action.payload.enviado,
                    };
                }
                return voice;
            });
            console.log(state.voices);
        },
        getVoice: (state, action: PayloadAction<Voice | null>) => {
            state.voiceSelected = action.payload;
        },
        getTranscriptState: (state, action: PayloadAction<string>) => {
            state.transcriptState = action.payload;
        },
        cleanTrasncriptState: (state) => {
            state.transcriptState = "";
        },
    },
});

export const {
    addVoicesToList,
    updateVoice,
    getVoice,
    getTranscriptState,
    cleanTrasncriptState,
} = voiceSlice.actions;

export default voiceSlice.reducer;
