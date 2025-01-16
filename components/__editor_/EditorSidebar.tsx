'use client';

import { HexColorPicker } from 'react-colorful';
import { Upload, Type, Palette, Layout } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { useState, useRef } from 'react';

interface EditorSidebarProps {
  activeTab: 'design' | 'customize' | 'preview';
  setActiveTab: (tab: 'design' | 'customize' | 'preview') => void;
}

export const EditorSidebar = ({
  activeTab,
  setActiveTab,
}: EditorSidebarProps) => {
  const {
    addImage,
    addText,
    currentColor,
    changeColor,
    backgroundColor,
    setBackgroundColor,
  } = useEditor();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addImage(file);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const presetColors = [
    '#000000', // Black
    '#ffffff', // White
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
  ];

  const backgroundPresets = [
    '#ffffff', // White
    '#f3f4f6', // Light Gray
    '#000000', // Black
    '#fef2f2', // Light Red
    '#f0fdf4', // Light Green
    '#eff6ff', // Light Blue
    '#fdf4ff', // Light Purple
    '#fff7ed', // Light Orange
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex gap-4 mb-6">
        {['design', 'customize', 'preview'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'design' && (
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <Upload className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Upload Image
              </span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => addText('Your Text Here')}
              className="flex flex-col items-center gap-2 w-full"
            >
              <Type className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Add Text
              </span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'customize' && (
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Element Color
              </span>
            </div>
            <div className="relative">
              <button
                className="w-full h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: currentColor }}
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                  setShowBgColorPicker(false);
                }}
              />
              {showColorPicker && (
                <div className="absolute z-10 mt-2">
                  <HexColorPicker color={currentColor} onChange={changeColor} />
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-8 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: color }}
                  onClick={() => changeColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Background Color
              </span>
            </div>
            <div className="relative">
              <button
                className="w-full h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700"
                style={{ backgroundColor }}
                onClick={() => {
                  setShowBgColorPicker(!showBgColorPicker);
                  setShowColorPicker(false);
                }}
              />
              {showBgColorPicker && (
                <div className="absolute z-10 mt-2">
                  <HexColorPicker
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                  />
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-8 gap-2">
              {backgroundPresets.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColor(color)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
