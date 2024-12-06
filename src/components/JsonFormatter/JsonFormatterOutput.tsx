import React from 'react';
import { JsonTreeView } from '../JsonTreeView';
import { useJsonFormatterStore } from './store';

export function JsonFormatterOutput() {
  const { parsedData } = useJsonFormatterStore();

  if (!parsedData) return null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Formatted Output
      </label>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto font-mono">
        <JsonTreeView data={parsedData} />
      </div>
    </div>
  );
}