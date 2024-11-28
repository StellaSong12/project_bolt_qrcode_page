import React, { useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Copy, Download, RefreshCw, Save, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QRCodeList } from './QRCodeList';
import type { QRCodeItem } from '../types/qrcode';

export function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedItems, setSavedItems] = useLocalStorage<QRCodeItem[]>('qrcodes', []);

  const generateQRCode = async (value: string) => {
    try {
      setIsGenerating(true);
      const url = await QRCode.toDataURL(value, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value) {
      generateQRCode(e.target.value);
    } else {
      setQrCodeUrl('');
    }
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRefresh = () => {
    if (text) {
      generateQRCode(text);
    }
  };

  const handleSave = () => {
    if (text && qrCodeUrl) {
      const newItem: QRCodeItem = {
        id: Date.now().toString(),
        text,
        qrCodeUrl,
        createdAt: Date.now(),
      };
      setSavedItems([newItem, ...savedItems]);
      setText('');
      setQrCodeUrl('');
    }
  };

  const handleDelete = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved QR codes?')) {
      setSavedItems([]);
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left sidebar with saved QR codes */}
      <div className="w-1/3 bg-white rounded-lg shadow-md p-4 h-[calc(100vh-12rem)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Saved QR Codes</h2>
          {savedItems.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </button>
          )}
        </div>
        <QRCodeList items={savedItems} onDelete={handleDelete} />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Enter text or URL
            </label>
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter text or URL to generate QR code..."
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <button
              onClick={handleCopyClick}
              disabled={!text}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </button>
            <button
              onClick={handleRefresh}
              disabled={!text}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={handleSave}
              disabled={!text || !qrCodeUrl}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save QR Code
            </button>
          </div>

          {qrCodeUrl && (
            <div className="flex flex-col items-center space-y-4">
              <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}