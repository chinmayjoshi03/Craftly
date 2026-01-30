import React, { useCallback, useRef } from 'react';
import { useEditorStore } from '../store/useEditorStore';

const iconOptions = ['⭐', '❤️', '🔔', '⚙️', '🏠', '👤', '🔍', '✉️', '📍', '🎯'];

export const PropertiesPanel: React.FC = () => {
    const { elements, selectedId, updateElementStyle, updateElement, deleteElement } =
        useEditorStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectedElement = elements.find((el) => el.id === selectedId);

    const handleStyleChange = useCallback(
        (property: string, value: number | string | boolean) => {
            if (selectedId) {
                updateElementStyle(selectedId, { [property]: value });
            }
        },
        [selectedId, updateElementStyle]
    );

    const handleContentChange = useCallback(
        (content: string) => {
            if (selectedId) {
                updateElement(selectedId, { content });
            }
        },
        [selectedId, updateElement]
    );

    const handleDelete = useCallback(() => {
        if (selectedId) {
            deleteElement(selectedId);
        }
    }, [selectedId, deleteElement]);

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file && selectedId) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageUrl = event.target?.result as string;
                    updateElementStyle(selectedId, { imageUrl });
                };
                reader.readAsDataURL(file);
            }
        },
        [selectedId, updateElementStyle]
    );

    const handleImageUrlChange = useCallback(
        (url: string) => {
            if (selectedId) {
                updateElementStyle(selectedId, { imageUrl: url });
            }
        },
        [selectedId, updateElementStyle]
    );

    if (!selectedElement) {
        return (
            <div className="properties-panel">
                <div className="empty-state">
                    <div className="empty-state-icon">⚙️</div>
                    <div className="empty-state-text">
                        Select an element to edit its properties
                    </div>
                </div>
            </div>
        );
    }

    const { type, style, content } = selectedElement;

    return (
        <div className="properties-panel">
            <div className="property-group">
                <div className="property-group-title">Element: {type}</div>
                <button
                    onClick={handleDelete}
                    style={{
                        marginTop: 8,
                        padding: '8px 16px',
                        background: '#ef4444',
                        border: 'none',
                        borderRadius: 4,
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 12,
                    }}
                >
                    Delete Element
                </button>
            </div>

            {/* Image upload */}
            {type === 'Image' && (
                <div className="property-group">
                    <div className="property-group-title">Image Source</div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: '#6366f1',
                            border: 'none',
                            borderRadius: 8,
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: 500,
                            marginBottom: 12,
                        }}
                    >
                        📁 Choose from Gallery
                    </button>
                    <div className="property-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 4 }}>
                        <span className="property-label" style={{ marginBottom: 4 }}>Or enter URL:</span>
                        <input
                            type="text"
                            className="property-input"
                            style={{ width: '100%' }}
                            placeholder="https://example.com/image.jpg"
                            value={style.imageUrl || ''}
                            onChange={(e) => handleImageUrlChange(e.target.value)}
                        />
                    </div>
                    {style.imageUrl && (
                        <button
                            onClick={() => handleImageUrlChange('')}
                            style={{
                                marginTop: 8,
                                padding: '6px 12px',
                                background: '#374151',
                                border: 'none',
                                borderRadius: 4,
                                color: '#9ca3af',
                                cursor: 'pointer',
                                fontSize: 12,
                            }}
                        >
                            Clear Image
                        </button>
                    )}
                </div>
            )}

            {/* Content for Text, Button, Input, Card */}
            {(type === 'Button' || type === 'Text' || type === 'Input' || type === 'Card') && (
                <div className="property-group">
                    <div className="property-group-title">Content</div>
                    <div className="property-row">
                        <input
                            type="text"
                            className="property-input"
                            style={{ width: '100%' }}
                            value={content || ''}
                            onChange={(e) => handleContentChange(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Icon selector */}
            {type === 'Icon' && (
                <div className="property-group">
                    <div className="property-group-title">Icon</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {iconOptions.map((icon) => (
                            <div
                                key={icon}
                                onClick={() => handleContentChange(icon)}
                                style={{
                                    width: 36,
                                    height: 36,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    background: content === icon ? '#6366f1' : '#252525',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    border: content === icon ? '2px solid #818cf8' : '1px solid #2a2a2a',
                                }}
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Switch toggle */}
            {type === 'Switch' && (
                <div className="property-group">
                    <div className="property-group-title">State</div>
                    <div className="property-row">
                        <span className="property-label">Is On</span>
                        <input
                            type="checkbox"
                            checked={style.isOn !== false}
                            onChange={(e) => handleStyleChange('isOn', e.target.checked)}
                            style={{ width: 20, height: 20, cursor: 'pointer' }}
                        />
                    </div>
                </div>
            )}

            <div className="property-group">
                <div className="property-group-title">Position</div>
                <div className="property-row">
                    <span className="property-label">X</span>
                    <input
                        type="number"
                        className="property-input"
                        value={style.x}
                        onChange={(e) => handleStyleChange('x', parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className="property-row">
                    <span className="property-label">Y</span>
                    <input
                        type="number"
                        className="property-input"
                        value={style.y}
                        onChange={(e) => handleStyleChange('y', parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>

            <div className="property-group">
                <div className="property-group-title">Size</div>
                <div className="property-row">
                    <span className="property-label">Width</span>
                    <input
                        type="number"
                        className="property-input"
                        value={style.width}
                        onChange={(e) => handleStyleChange('width', parseInt(e.target.value) || 40)}
                    />
                </div>
                <div className="property-row">
                    <span className="property-label">Height</span>
                    <input
                        type="number"
                        className="property-input"
                        value={style.height}
                        onChange={(e) => handleStyleChange('height', parseInt(e.target.value) || 24)}
                    />
                </div>
            </div>

            <div className="property-group">
                <div className="property-group-title">Appearance</div>
                {type !== 'Text' && type !== 'Icon' && type !== 'Image' && (
                    <div className="property-row">
                        <span className="property-label">Background</span>
                        <input
                            type="color"
                            className="property-input property-input-color"
                            value={style.backgroundColor || '#6366f1'}
                            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        />
                    </div>
                )}
                {(type === 'Button' || type === 'Image' || type === 'Input' || type === 'Card' || type === 'Container' || type === 'Switch') && (
                    <div className="property-row">
                        <span className="property-label">Border Radius</span>
                        <input
                            type="number"
                            className="property-input"
                            value={style.borderRadius || 0}
                            onChange={(e) =>
                                handleStyleChange('borderRadius', parseInt(e.target.value) || 0)
                            }
                        />
                    </div>
                )}
                {(type === 'Input' || type === 'Container') && (
                    <>
                        <div className="property-row">
                            <span className="property-label">Border Width</span>
                            <input
                                type="number"
                                className="property-input"
                                value={style.borderWidth || 0}
                                onChange={(e) =>
                                    handleStyleChange('borderWidth', parseInt(e.target.value) || 0)
                                }
                            />
                        </div>
                        <div className="property-row">
                            <span className="property-label">Border Color</span>
                            <input
                                type="color"
                                className="property-input property-input-color"
                                value={style.borderColor || '#d1d5db'}
                                onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                            />
                        </div>
                    </>
                )}
            </div>

            {(type === 'Button' || type === 'Text' || type === 'Input' || type === 'Icon') && (
                <div className="property-group">
                    <div className="property-group-title">Typography</div>
                    <div className="property-row">
                        <span className="property-label">Font Size</span>
                        <input
                            type="number"
                            className="property-input"
                            value={style.fontSize || 16}
                            onChange={(e) =>
                                handleStyleChange('fontSize', parseInt(e.target.value) || 12)
                            }
                        />
                    </div>
                    <div className="property-row">
                        <span className="property-label">Color</span>
                        <input
                            type="color"
                            className="property-input property-input-color"
                            value={style.color || '#ffffff'}
                            onChange={(e) => handleStyleChange('color', e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
