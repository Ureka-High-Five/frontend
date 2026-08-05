import { create } from "zustand";

interface AudioState {
  isMuted: boolean;
  setMuted: (muted: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: true, // 초기값은 음소거
  setMuted: (muted: boolean) => set({ isMuted: muted }),
}));
