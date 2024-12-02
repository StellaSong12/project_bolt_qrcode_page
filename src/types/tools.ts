export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ToolSwitcherProps {
  currentTool: string;
  onToolChange: (toolId: string) => void;
}