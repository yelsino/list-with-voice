import { Voice, VoiceState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState: VoiceState = {
    transcriptState: "",
    voices: [],
    phases: [],
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
                const codigo = state.voiceSelected.codigo

                const newVoice: Voice = {
                    voz: missingVoices[0],
                    status: "pending",
                    enviado: false,
                    codigo: codigo,
                };

                const newVoices = state.voices.map((voice) => {
                    if (voice.codigo === codigo) {
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
                codigo: uuidv4(),
            }));

            state.voices = [...state.voices, ...newVoices];
            state.phases = []
        },
        addPhase: (state, action:PayloadAction<string[]>) => {
            state.phases = action.payload
        },
        updateVoice: (state, action: PayloadAction<Voice>) => {
            state.voices = state.voices.map((voice) => {
                if (voice.codigo === action.payload.codigo) {
                    return {
                        ...voice,
                        status: action.payload.status,
                        enviado: action.payload.enviado,
                    };
                }
                return voice;
            });
        },
        getVoice: (state, action: PayloadAction<Voice | null>) => {
            state.voiceSelected = action.payload;
        },
        cleanVoices: (state) => {
            state.voices = []
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
    cleanVoices,
    addPhase
} = voiceSlice.actions;

export default voiceSlice.reducer;
