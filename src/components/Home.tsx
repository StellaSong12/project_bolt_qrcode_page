import React from 'react';
import { tools } from '../config/tools';
import { useNavigate } from '../hooks/useNavigate';

export function Home() {
  const { navigateToTool } = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Stella Dev Tools
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of essential development tools to streamline your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => navigateToTool(tool.id)}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left border border-gray-100 hover:border-blue-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{tool.name}</h2>
                </div>
                <p className="text-gray-600">{tool.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}