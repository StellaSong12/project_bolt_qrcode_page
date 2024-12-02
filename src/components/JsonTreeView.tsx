import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonTreeViewProps {
  data: any;
  level?: number;
  isLast?: boolean;
}

export function JsonTreeView({ data, level = 0, isLast = true }: JsonTreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const indent = level * 20;

  if (data === null) {
    return <span className="text-gray-500">null</span>;
  }

  if (typeof data !== 'object') {
    return (
      <span className={
        typeof data === 'string' ? 'text-green-600' :
        typeof data === 'number' ? 'text-blue-600' :
        typeof data === 'boolean' ? 'text-purple-600' : 'text-gray-800'
      }>
        {JSON.stringify(data)}
      </span>
    );
  }

  const isArray = Array.isArray(data);
  const items = isArray ? data : Object.entries(data);
  const isEmpty = items.length === 0;
  const bracketColor = isArray ? 'text-yellow-600' : 'text-gray-600';

  if (isEmpty) {
    return (
      <span className={bracketColor}>
        {isArray ? '[]' : '{}'}
      </span>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </button>
        <span className={bracketColor}>{isArray ? '[' : '{'}</span>
        {!isExpanded && (
          <span className="text-gray-400 ml-1">
            {isArray ? `${items.length} items` : `${items.length} properties`}
          </span>
        )}
      </div>

      {isExpanded && (
        <div style={{ marginLeft: `${indent}px` }} className="ml-4">
          {(isArray ? items : Object.entries(data)).map((item, index) => {
            const isLastItem = index === items.length - 1;
            const [key, value] = isArray ? [index, item] : item;

            return (
              <div key={key} className="flex">
                <span className="text-gray-800 mr-2">
                  {!isArray && (
                    <>
                      <span className="text-blue-800">&quot;{key}&quot;</span>
                      <span className="text-gray-600">: </span>
                    </>
                  )}
                </span>
                <JsonTreeView
                  data={value}
                  level={level + 1}
                  isLast={isLastItem}
                />
                {!isLastItem && <span className="text-gray-600">,</span>}
              </div>
            );
          })}
        </div>
      )}
      
      <div style={{ marginLeft: isExpanded ? `${indent}px` : 0 }} className="ml-4">
        <span className={bracketColor}>{isArray ? ']' : '}'}</span>
      </div>
    </div>
  );
}