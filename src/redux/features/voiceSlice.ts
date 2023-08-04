import { Voice, VoiceState } from "@/interfaces/list.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VoiceState = {
    voices: [],
    calculated: false,
};

export const voiceSlice = createSlice({
    name: "voices",
    initialState,
    reducers: {
        addVoicesToList: (state, action: PayloadAction<string[]>) => {
            const missingVoices = action.payload.filter(
                (text) => !state.voices.some((voice) => voice.voz === text)
            );

            const newVoices: Voice[] = missingVoices.map((text) => ({
                voz: text,
                status: "pending",
                codigo: `${state.voices.length + 1}`,
            }));

            state.voices = [...state.voices, ...newVoices];
        },
        updateVoice: (state, action: PayloadAction<Voice>) => {
            state.voices = state.voices.map((voice) => {
                if (voice.codigo === action.payload.codigo) {
                    return {
                        ...voice,
                        status: action.payload.status,
                    };
                }
                return voice;
            });
            console.log(state.voices);
        },
    },
});

export const { addVoicesToList, updateVoice } = voiceSlice.actions;

export default voiceSlice.reducer;
