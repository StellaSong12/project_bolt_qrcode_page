import React from 'react';
import { Trash2 } from 'lucide-react';
import { QRCodeList } from './QRCodeList';
import type { QRCodeItem } from '../types/qrcode';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  items: QRCodeItem[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function Sidebar({ isOpen, isMobile, items, onDelete, onClearAll, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-out
          fixed lg:relative z-40 lg:z-0
          w-[85%] sm:w-80 lg:w-1/3
          ${isMobile ? 'top-0 h-screen' : 'h-[calc(100vh-12rem)]'}
          bg-white shadow-lg lg:shadow-md
          lg:translate-x-0
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Saved QR Codes</h2>
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <QRCodeList items={items} onDelete={onDelete} isMobile={isMobile} />
        </div>
      </aside>
    </>
  );
}