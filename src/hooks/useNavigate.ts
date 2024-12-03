import { useCallback } from 'react';
import { useToolState } from '../store/toolState';

export function useNavigate() {
  const { setCurrentTool } = useToolState();

  const navigateToTool = useCallback((toolId: string) => {
    setCurrentTool(toolId);
  }, [setCurrentTool]);

  const navigateToHome = useCallback(() => {
    setCurrentTool('home');
  }, [setCurrentTool]);

  return { navigateToTool, navigateToHome };
}