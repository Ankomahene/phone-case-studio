'use client';

import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { ResizeControl } from './ResizeControl';

interface TextElementProps {
  id: string;
  text: string;
  position: { x: number; y: number };
  font: string;
  color: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  isUppercase: boolean;
  textAlign: 'left' | 'center' | 'right';
  isSelected: boolean;
  onSelect?: () => void;
  onPositionChange?: (x: number, y: number) => void;
  onTextChange?: (text: string) => void;
}

export const TextElement = ({
  id,
  text,
  position,
  font,
  color,
  fontSize,
  isBold,
  isItalic,
  isUppercase,
  textAlign,
  isSelected,
  onSelect,
  onPositionChange,
  onTextChange,
}: TextElementProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
    onSelect?.();
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    onTextChange?.(e.target.textContent || '');
  };

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 'auto',
        height: 'auto',
      }}
      minWidth={50}
      minHeight={30}
      enableResizing={isSelected}
      disableDragging={isEditing}
      onDragStop={(_e, d) => onPositionChange?.(d.x, d.y)}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect?.();
      }}
      resizeHandleComponent={
        isSelected
          ? {
              topLeft: <ResizeControl />,
              topRight: <ResizeControl />,
              bottomLeft: <ResizeControl />,
              bottomRight: <ResizeControl />,
            }
          : {}
      }
      className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div
        contentEditable={isEditing}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        className="p-2 outline-none whitespace-nowrap cursor-move"
        style={{
          fontFamily: font,
          color: color,
          fontSize: `${fontSize}px`,
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          textTransform: isUppercase ? 'uppercase' : 'none',
          textAlign: textAlign,
          cursor: isEditing ? 'text' : 'move',
          minWidth: '100px',
        }}
        suppressContentEditableWarning
      >
        {text}
      </div>
    </Rnd>
  );
};
