import React, { useState, useCallback } from 'react';
import { GitCompare, ChevronRight, ChevronDown } from 'lucide-react';
import { useToolState } from '../store/toolState';
import { computeTextDiff, DiffResult } from '../utils/diffUtils';

export function TextDiff() {
  const { textDiff, setTextDiff } = useToolState();
  const [diffResult, setDiffResult] = useState<DiffResult[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const handleText1Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextDiff(e.target.value, textDiff.text2);
  }, [textDiff.text2, setTextDiff]);

  const handleText2Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextDiff(textDiff.text1, e.target.value);
  }, [textDiff.text1, setTextDiff]);

  const handleCompare = useCallback(() => {
    const result = computeTextDiff(textDiff.text1, textDiff.text2);
    setDiffResult(result);
    setExpandedSections(new Set());
  }, [textDiff.text1, textDiff.text2]);

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

  const renderDiffLine = (diff: DiffResult, index: number | string) => {
    if (diff.isCollapsible) {
      const isExpanded = expandedSections.has(diff.sectionId!);
      
      return (
        <tr key={index} className="bg-gray-50 hover:bg-gray-100">
          <td className="w-12 text-right px-4 py-2 text-gray-500 select-none"></td>
          <td className="w-12 text-right px-4 py-2 text-gray-500 select-none"></td>
          <td className="px-4 py-2">
            <button
              onClick={() => toggleSection(diff.sectionId!)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              {diff.value}
            </button>
          </td>
        </tr>
      );
    }

    const bgColor = diff.type === 'equal'
      ? ''
      : diff.type === 'add'
        ? 'bg-green-50'
        : 'bg-red-50';

    const textColor = diff.type === 'equal'
      ? 'text-gray-700'
      : diff.type === 'add'
        ? 'text-green-700'
        : 'text-red-700';

    return (
      <tr key={index} className={bgColor}>
        <td className="w-12 text-right px-4 py-2 text-gray-500 select-none font-mono text-xs">
          {diff.lineNumber.old}
        </td>
        <td className="w-12 text-right px-4 py-2 text-gray-500 select-none font-mono text-xs">
          {diff.lineNumber.new}
        </td>
        <td className={`px-4 py-2 font-mono text-sm whitespace-pre ${textColor}`}>
          {diff.type === 'add' && '+ '}
          {diff.type === 'remove' && '- '}
          {diff.type === 'equal' && '  '}
          {diff.value}
        </td>
      </tr>
    );
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <GitCompare className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Text Diff</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Text
            </label>
            <textarea
              value={textDiff.text1}
              onChange={handleText1Change}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
              placeholder="Enter original text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modified Text
            </label>
            <textarea
              value={textDiff.text2}
              onChange={handleText2Change}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
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
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="text-lg font-semibold text-gray-900">Differences</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {diffResult.map((diff, index) => {
                      if (diff.isCollapsible && diff.sectionId) {
                        const isExpanded = expandedSections.has(diff.sectionId);
                        return (
                          <React.Fragment key={index}>
                            {renderDiffLine(diff, index)}
                            {isExpanded && diff.hiddenLines?.map((hiddenDiff, hiddenIndex) => 
                              renderDiffLine(hiddenDiff, `${index}-${hiddenIndex}`)
                            )}
                          </React.Fragment>
                        );
                      }
                      return renderDiffLine(diff, index);
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}