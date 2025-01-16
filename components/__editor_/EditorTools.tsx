'use client';

import {
  Trash2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  MoveUp,
  MoveDown,
  ArrowUpToLine,
  ArrowDownToLine,
} from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';

export const EditorTools = () => {
  const {
    canvas,
    hasSelection,
    deleteObject,
    rotateObject,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    zoomIn,
    zoomOut,
  } = useEditor();

  return (
    <div className="flex justify-center gap-4 mt-6 flex-wrap">
      <button
        className={`p-2 rounded-lg transition-colors ${
          hasSelection
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="Delete"
        onClick={deleteObject}
        disabled={!hasSelection}
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg transition-colors ${
          hasSelection
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="Rotate"
        onClick={rotateObject}
        disabled={!hasSelection}
      >
        <RotateCw className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg transition-colors ${
          hasSelection
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="Bring Forward"
        onClick={bringForward}
        disabled={!hasSelection}
      >
        <MoveUp className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg transition-colors ${
          hasSelection
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="Send Backward"
        onClick={sendBackward}
        disabled={!hasSelection}
      >
        <MoveDown className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg transition-colors ${
          hasSelection
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="Bring to Front"
        onClick={bringToFront}
        disabled={!hasSelection}
      >
        <ArrowUpToLine className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg transition-colors ${
          hasSelection
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="Send to Back"
        onClick={sendToBack}
        disabled={!hasSelection}
      >
        <ArrowDownToLine className="w-5 h-5" />
      </button>
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Zoom In"
        onClick={zoomIn}
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Zoom Out"
        onClick={zoomOut}
      >
        <ZoomOut className="w-5 h-5" />
      </button>
    </div>
  );
};
