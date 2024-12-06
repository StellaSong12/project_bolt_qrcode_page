import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TextDiffState {
  text1: string;
  text2: string;
  setText1: (text: string) => void;
  setText2: (text: string) => void;
}

export const useTextDiffStore = create<TextDiffState>()(
  persist(
    (set) => ({
      text1: '',
      text2: '',
      setText1: (text: string) => set({ text1: text }),
      setText2: (text: string) => set({ text2: text }),
    }),
    {
      name: 'text-diff-state',
    }
  )
);