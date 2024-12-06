import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useToolState = create<ToolState>()(
  persist(
    (set) => ({
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
        set((state) => ({
          textDiff: { ...state.textDiff, text1, text2 }
        })),
      setJsonFormatter: (input: string, formatted: string) =>
        set((state) => ({
          jsonFormatter: { ...state.jsonFormatter, input, formatted }
        })),
    }),
    {
      name: 'tool-state',
      partialize: (state) => ({
        textDiff: state.textDiff,
        jsonFormatter: state.jsonFormatter,
      }),
    }
  )
);