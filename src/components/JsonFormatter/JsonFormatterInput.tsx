import React from 'react';
import { FileJson } from 'lucide-react';
import { TextArea } from '../shared/TextArea';
import { useJsonFormatterStore } from './store';

export function JsonFormatterInput() {
  const { input, isJson5Mode, setInput, setIsJson5Mode, formatJson } = useJsonFormatterStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isJson5Mode}
              onChange={(e) => setIsJson5Mode(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">JSON5 Mode</span>
          </label>
        </div>
        <button
          onClick={formatJson}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FileJson className="w-4 h-4 mr-2" />
          Format
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input JSON
        </label>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter ${isJson5Mode ? 'JSON5' : 'JSON'} here...`}
        />
      </div>
    </div>
  );
}