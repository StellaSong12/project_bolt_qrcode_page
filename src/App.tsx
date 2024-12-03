import React from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { TextDiff } from './components/TextDiff';
import { JsonFormatter } from './components/JsonFormatter';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { useToolState } from './store/toolState';

function App() {
  const { currentTool } = useToolState();

  const CurrentToolComponent = () => {
    switch (currentTool) {
      case 'home':
        return <Home />;
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
      <Header />
      <CurrentToolComponent />
    </div>
  );
}

export default App;