import { create } from 'zustand';

interface ToolState {
  textDiff: {
    text1: string;
    text2: string;
  };
  jsonFormatter: {
    input: string;
    formatted: string;
  };
  setTextDiff: (text1: string, text2: string) => void;
  setJsonFormatter: (input: string, formatted: string) => void;
}

export const useToolState = create<ToolState>((set) => ({
  textDiff: {
    text1: '',
    text2: '',
  },
  jsonFormatter: {
    input: '',
    formatted: '',
  },
  setTextDiff: (text1: string, text2: string) => 
    set({ textDiff: { text1, text2 } }),
  setJsonFormatter: (input: string, formatted: string) =>
    set({ jsonFormatter: { input, formatted } }),
}));