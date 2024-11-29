import React, { useState } from 'react';
import { Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import type { QRCodeItem } from '../types/qrcode';

interface QRCodeListProps {
  items: QRCodeItem[];
  onDelete: (id: string) => void;
  isMobile: boolean;
}

export function QRCodeList({ items, onDelete, isMobile }: QRCodeListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No saved QR codes yet</p>
        <p className="text-sm mt-2">Generated QR codes will appear here</p>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <div className="p-3">
            <div className="flex items-start justify-between">
              <button
                onClick={() => toggleExpand(item.id)}
                className="flex items-start space-x-2 text-left flex-1"
              >
                {expandedId === item.id ? (
                  <ChevronDown className="w-4 h-4 mt-1 flex-shrink-0 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0 text-gray-500" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 break-words line-clamp-2">{item.text}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="text-gray-400 hover:text-red-500 p-1 -mr-1 rounded-md hover:bg-gray-200 transition-colors duration-200"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {expandedId === item.id && (
            <div className="px-3 pb-3">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <img
                  src={item.qrCodeUrl}
                  alt="QR Code"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}