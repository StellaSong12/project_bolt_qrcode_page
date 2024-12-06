import React, { useState, useCallback } from 'react';
import { GitCompare } from 'lucide-react';
import { computeTextDiff } from '../../utils/diffUtils';
import { DiffViewer } from '../DiffViewer';
import { TextArea } from './TextArea';
import { useTextDiffStore } from './store';

export function TextDiff() {
  const { text1, text2, setText1, setText2 } = useTextDiffStore();
  const [diffResult, setDiffResult] = useState<ReturnType<typeof computeTextDiff>>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const handleText1Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText1(e.target.value);
  }, [setText1]);

  const handleText2Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText2(e.target.value);
  }, [setText2]);

  const handleCompare = useCallback(() => {
    const result = computeTextDiff(text1, text2);
    setDiffResult(result);
    setExpandedSections(new Set());
  }, [text1, text2]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Text
          </label>
          <TextArea
            value={text1}
            onChange={handleText1Change}
            placeholder="Enter original text..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modified Text
          </label>
          <TextArea
            value={text2}
            onChange={handleText2Change}
            placeholder="Enter modified text..."
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleCompare}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <GitCompare className="w-4 h-4 mr-2" />
          Compare Texts
        </button>
      </div>

      {diffResult.length > 0 && (
        <DiffViewer
          diffResult={diffResult}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
        />
      )}
    </main>
  );
}