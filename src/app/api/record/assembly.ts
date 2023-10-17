import AssemblyAI from 'assemblyai';

export const assembly = new AssemblyAI({
  apiKey: process.env.API_KEY_ASSEMBLY,
});