import { QrCode, GitCompare, FileJson } from 'lucide-react';
import type { Tool } from '../types/tools';

export const tools: Tool[] = [
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs',
    icon: QrCode,
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    description: 'Compare two texts and highlight differences',
    icon: GitCompare,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON/JSON5',
    icon: FileJson,
  },
];