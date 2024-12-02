import React from 'react';
import { tools } from '../config/tools';
import type { ToolSwitcherProps } from '../types/tools';

export function ToolSwitcher({ currentTool, onToolChange }: ToolSwitcherProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = currentTool === tool.id;
        
        return (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg
              transition-colors duration-200
              ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">{tool.name}</span>
          </button>
        );
      })}
    </div>
  );
}