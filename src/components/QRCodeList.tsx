import React, { useState } from 'react';
import { Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import type { QRCodeItem } from '../types/qrcode';

interface QRCodeListProps {
  items: QRCodeItem[];
  onDelete: (id: string) => void;
}

export function QRCodeList({ items, onDelete }: QRCodeListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No saved QR codes yet
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
        <div key={item.id} className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-start justify-between">
            <button
              onClick={() => toggleExpand(item.id)}
              className="flex items-start space-x-2 text-left flex-1"
            >
              {expandedId === item.id ? (
                <ChevronDown className="w-4 h-4 mt-1 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-900 break-words">{item.text}</p>
                <span className="text-xs text-gray-500">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="text-red-500 hover:text-red-700 p-1 ml-2"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {expandedId === item.id && (
            <div className="mt-3">
              <img
                src={item.qrCodeUrl}
                alt="QR Code"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}