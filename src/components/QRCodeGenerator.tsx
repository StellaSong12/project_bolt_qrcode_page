import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Copy, Download, RefreshCw, Save, Menu, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useIsMobile } from '../hooks/useIsMobile';
import { Sidebar } from './Sidebar';
import type { QRCodeItem } from '../types/qrcode';

export function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedItems, setSavedItems] = useLocalStorage<QRCodeItem[]>('qrcodes', []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

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
      if (isMobile) {
        setIsSidebarOpen(false);
      }
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        items={savedItems}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-200 hover:scale-105"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main content area */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                Enter text or URL
              </label>
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter text or URL to generate QR code..."
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={handleCopyClick}
                disabled={!text}
                className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
              >
                <Copy className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Copy Text</span>
              </button>
              <button
                onClick={handleRefresh}
                disabled={!text}
                className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!text || !qrCodeUrl}
                className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Save QR Code</span>
              </button>
            </div>

            {qrCodeUrl && (
              <div className="flex flex-col items-center space-y-4 pt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 sm:w-64 sm:h-64" />
                </div>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Download QR Code</span>
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
    </div>
  );
}