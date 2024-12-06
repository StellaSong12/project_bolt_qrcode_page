import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => (
  <textarea
    value={value}
    onChange={onChange}
    className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
    placeholder={placeholder}
  />
);