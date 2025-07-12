import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AgentSettingsState {
  creativity: string;
  humanised: boolean;
  project: string;
  setCreativity: (creativity: string) => void;
  setHumanised: (humanised: boolean) => void;
  setProject: (project: string) => void;
}

export const useAgentSettingsStore = create<AgentSettingsState>()(
  persist(
    (set) => ({
      creativity: 'balanced',
      humanised: false,
      project: 'project1',
      setCreativity: (creativity) => set({ creativity }),
      setHumanised: (humanised) => set({ humanised }),
      setProject: (project) => set({ project }),
    }),
    {
      name: 'agent-settings-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
