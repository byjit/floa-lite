import { DEFAULT_AI_MODEL_ID, Tone } from '@/lib/constant';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface AgentSettingsState {
  creativity: string;
  tone?: Tone;
  humanised: boolean;
  aiModelId: string;
  project: string;
  setCreativity: (creativity: string) => void;
  setHumanised: (humanised: boolean) => void;
  setProject: (project: string) => void;
  setAiModelId: (aiModelId: string) => void;
  setTone: (tone: Tone) => void;
}

export const useAgentSettingsStore = create<AgentSettingsState>()(
  persist(
    (set) => ({
      creativity: 'Balanced',
      tone: undefined,
      humanised: false,
      aiModelId: DEFAULT_AI_MODEL_ID,
      project: '',
      setCreativity: (creativity) => set({ creativity }),
      setHumanised: (humanised) => set({ humanised }),
      setProject: (project) => set({ project }),
      setAiModelId: (aiModelId) => set({ aiModelId }),
      setTone: (tone) => set({ tone }),
    }),
    {
      name: 'agent-settings-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
