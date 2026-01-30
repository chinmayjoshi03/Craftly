import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import type { ElementType } from '../store/useEditorStore';

const elements: { type: ElementType; icon: string; label: string }[] = [
    { type: 'Button', icon: '🔲', label: 'Button' },
    { type: 'Text', icon: '📝', label: 'Text' },
    { type: 'Image', icon: '🖼️', label: 'Image' },
    { type: 'Input', icon: '✏️', label: 'Input' },
    { type: 'Card', icon: '🃏', label: 'Card' },
    { type: 'Icon', icon: '⭐', label: 'Icon' },
    { type: 'Container', icon: '📦', label: 'Container' },
    { type: 'Switch', icon: '🔘', label: 'Switch' },
];

export const ElementPalette: React.FC = () => {
    const addElement = useEditorStore((state) => state.addElement);

    return (
        <div className="panel element-palette">
            <div className="panel-header">Elements</div>
            <div className="palette-items">
                {elements.map((el) => (
                    <div
                        key={el.type}
                        className="palette-item"
                        onClick={() => addElement(el.type)}
                    >
                        <div className="palette-item-icon">{el.icon}</div>
                        <div className="palette-item-label">{el.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
