import React, { useState, useCallback } from 'react';
import { FileJson } from 'lucide-react';
import JSON5 from 'json5';
import { TextArea } from './shared/TextArea';
import { JsonTreeView } from './JsonTreeView';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isJson5Mode, setIsJson5Mode] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInput = e.target.value;
      setInput(newInput);
      setError(null);
    },
    []
  );

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some JSON to format');
      setParsedData(null);
      return;
    }

    try {
      const parser = isJson5Mode ? JSON5.parse : JSON.parse;
      const parsed = parser(input);
      setParsedData(parsed);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON format');
      }
      setParsedData(null);
    }
  }, [input, isJson5Mode]);

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 space-y-4">
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input JSON
              </label>
              <TextArea
                value={input}
                onChange={handleInputChange}
                placeholder={`Enter ${isJson5Mode ? 'JSON5' : 'JSON'} here...`}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error parsing {isJson5Mode ? 'JSON5' : 'JSON'}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">{error}</div>
                  </div>
                </div>
              </div>
            )}

            {parsedData && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formatted Output
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto font-mono">
                  <JsonTreeView data={parsedData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}