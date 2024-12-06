import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import JSON5 from 'json5';

interface JsonFormatterState {
  input: string;
  parsedData: any;
  error: string | null;
  isJson5Mode: boolean;
  setInput: (input: string) => void;
  setIsJson5Mode: (isJson5Mode: boolean) => void;
  formatJson: () => void;
}

export const useJsonFormatterStore = create<JsonFormatterState>()(
  persist(
    (set, get) => ({
      input: '',
      parsedData: null,
      error: null,
      isJson5Mode: false,
      setInput: (input: string) => set({ input, error: null }),
      setIsJson5Mode: (isJson5Mode: boolean) => set({ isJson5Mode }),
      formatJson: () => {
        const { input, isJson5Mode } = get();
        try {
          const parser = isJson5Mode ? JSON5.parse : JSON.parse;
          const parsedData = parser(input);
          set({ parsedData, error: null });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Invalid JSON format',
            parsedData: null,
          });
        }
      },
    }),
    {
      name: 'json-formatter-store',
      partialize: (state) => ({
        input: state.input,
        isJson5Mode: state.isJson5Mode,
      }),
    }
  )
);