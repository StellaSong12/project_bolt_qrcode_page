import { create } from 'zustand';

interface ToolState {
  currentTool: string;
  textDiff: {
    text1: string;
    text2: string;
  };
  jsonFormatter: {
    input: string;
    formatted: string;
  };
  setCurrentTool: (tool: string) => void;
  setTextDiff: (text1: string, text2: string) => void;
  setJsonFormatter: (input: string, formatted: string) => void;
}

export const useToolState = create<ToolState>((set) => ({
  currentTool: 'home',
  textDiff: {
    text1: '',
    text2: '',
  },
  jsonFormatter: {
    input: '',
    formatted: '',
  },
  setCurrentTool: (tool: string) => set({ currentTool: tool }),
  setTextDiff: (text1: string, text2: string) => 
    set({ textDiff: { text1, text2 } }),
  setJsonFormatter: (input: string, formatted: string) =>
    set({ jsonFormatter: { input, formatted } }),
}));