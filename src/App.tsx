import React, { useState } from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { TextDiff } from './components/TextDiff';
import { JsonFormatter } from './components/JsonFormatter';
import { ToolSwitcher } from './components/ToolSwitcher';
import { tools } from './config/tools';

function App() {
  const [currentTool, setCurrentTool] = useState(tools[0].id);

  const CurrentToolComponent = () => {
    switch (currentTool) {
      case 'qr-generator':
        return <QRCodeGenerator />;
      case 'text-diff':
        return <TextDiff />;
      case 'json-formatter':
        return <JsonFormatter />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <ToolSwitcher
              currentTool={currentTool}
              onToolChange={setCurrentTool}
            />
          </div>
        </div>
      </div>

      <CurrentToolComponent />
    </div>
  );
}

export default App;