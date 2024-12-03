import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';
import { useToolState } from '../store/toolState';
import { tools } from '../config/tools';

export function Header() {
  const { currentTool } = useToolState();
  const { navigateToHome } = useNavigate();
  
  if (currentTool === 'home') return null;

  const tool = tools.find(t => t.id === currentTool);
  if (!tool) return null;

  const Icon = tool.icon;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={navigateToHome}
            className="mr-4 p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <Icon className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{tool.name}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}