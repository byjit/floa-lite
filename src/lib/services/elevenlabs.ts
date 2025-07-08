import { env } from "@/env";
import axios from "axios";

export async function generateAudio(text: string): Promise<Buffer> {
    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${env.ELEVENLABS_VOICE_ID}`,
            {
                text: text,
                model_id: "eleven_multilingual_v2", // Or another appropriate model
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                },
            },
            {
                headers: {
                    "xi-api-key": env.ELEVENLABS_API_KEY,
                    "Content-Type": "application/json",
                    "Accept": "audio/mpeg",
                },
                responseType: "arraybuffer", // Important for handling audio data
            }
        );

        const audioBuffer = Buffer.from(response.data);
        return audioBuffer;
    } catch (error) {
        console.error("Error generating audio with ElevenLabs:", error);
        throw new Error("Failed to generate audio.");
    }
}
