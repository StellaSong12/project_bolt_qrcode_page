import React from 'react';
import { JsonFormatterInput } from './JsonFormatterInput';
import { JsonFormatterOutput } from './JsonFormatterOutput';
import { useJsonFormatterStore } from './store';

export function JsonFormatter() {
  const { error } = useJsonFormatterStore();

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 space-y-4">
          <JsonFormatterInput />

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error parsing JSON
                  </h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          <JsonFormatterOutput />
        </div>
      </div>
    </main>
  );
}