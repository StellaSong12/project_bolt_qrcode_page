import React, { memo } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { DiffResult } from '../utils/diffUtils';

interface DiffViewerProps {
  diffResult: DiffResult[];
  expandedSections: Set<string>;
  onToggleSection: (sectionId: string) => void;
}

const DiffLine = memo(({ 
  diff, 
  index, 
  isExpanded, 
  onToggle 
}: { 
  diff: DiffResult; 
  index: number | string; 
  isExpanded?: boolean; 
  onToggle?: () => void;
}) => {
  if (diff.isCollapsible) {
    return (
      <tr className="bg-gray-50 hover:bg-gray-100">
        <td className="w-12 text-right px-4 py-2 text-gray-500 select-none"></td>
        <td className="w-12 text-right px-4 py-2 text-gray-500 select-none"></td>
        <td className="px-4 py-2">
          <button
            onClick={onToggle}
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
});

DiffLine.displayName = 'DiffLine';

export function DiffViewer({ diffResult, expandedSections, onToggleSection }: DiffViewerProps) {
  return (
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
                      <DiffLine
                        diff={diff}
                        index={index}
                        isExpanded={isExpanded}
                        onToggle={() => onToggleSection(diff.sectionId!)}
                      />
                      {isExpanded && diff.hiddenLines?.map((hiddenDiff, hiddenIndex) => 
                        <DiffLine
                          key={`${index}-${hiddenIndex}`}
                          diff={hiddenDiff}
                          index={`${index}-${hiddenIndex}`}
                        />
                      )}
                    </React.Fragment>
                  );
                }
                return <DiffLine key={index} diff={diff} index={index} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}