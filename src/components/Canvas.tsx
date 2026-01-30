import React, { useCallback, useRef } from 'react';
import type { MouseEvent } from 'react';
import Draggable from 'react-draggable';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import type { ResizeCallbackData } from 'react-resizable';
import { useEditorStore } from '../store/useEditorStore';
import type { CanvasElement as CanvasElementType } from '../store/useEditorStore';
import 'react-resizable/css/styles.css';

interface CanvasElementProps {
    element: CanvasElementType;
}

const CanvasElementWrapper: React.FC<CanvasElementProps> = ({ element }) => {
    const { selectedId, selectElement, updateElementStyle } = useEditorStore();
    const isSelected = selectedId === element.id;
    const nodeRef = useRef<HTMLDivElement>(null);

    const handleDragStop = useCallback(
        (_e: DraggableEvent, data: DraggableData) => {
            updateElementStyle(element.id, {
                x: data.x,
                y: data.y,
            });
        },
        [element.id, updateElementStyle]
    );

    const handleResize = useCallback(
        (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
            updateElementStyle(element.id, {
                width: data.size.width,
                height: data.size.height,
            });
        },
        [element.id, updateElementStyle]
    );

    const handleClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            selectElement(element.id);
        },
        [element.id, selectElement]
    );

    const renderElementContent = () => {
        const { type, style, content } = element;

        switch (type) {
            case 'Button':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: style.backgroundColor || '#6366f1',
                            borderRadius: style.borderRadius || 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: style.color || '#ffffff',
                            fontSize: style.fontSize || 16,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        {content || 'Button'}
                    </div>
                );

            case 'Text':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            color: style.color || '#1a1a1a',
                            fontSize: style.fontSize || 18,
                        }}
                    >
                        {content || 'Text Label'}
                    </div>
                );

            case 'Image':
                return style.imageUrl ? (
                    <img
                        src={style.imageUrl}
                        alt="uploaded"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: style.borderRadius || 8,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: style.backgroundColor || '#e0e0e0',
                            borderRadius: style.borderRadius || 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                            fontSize: 14,
                            flexDirection: 'column',
                            gap: 8,
                        }}
                    >
                        <span style={{ fontSize: 32 }}>🖼️</span>
                        <span>Click to add image</span>
                    </div>
                );

            case 'Input':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: style.backgroundColor || '#ffffff',
                            borderRadius: style.borderRadius || 8,
                            border: `${style.borderWidth || 1}px solid ${style.borderColor || '#d1d5db'}`,
                            display: 'flex',
                            alignItems: 'center',
                            padding: `0 ${style.padding || 12}px`,
                            color: '#9ca3af',
                            fontSize: style.fontSize || 16,
                            boxSizing: 'border-box',
                        }}
                    >
                        {content || 'Enter text...'}
                    </div>
                );

            case 'Card':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: style.backgroundColor || '#ffffff',
                            borderRadius: style.borderRadius || 16,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            padding: style.padding || 16,
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: 16, color: '#1a1a1a' }}>
                            {content || 'Card Title'}
                        </div>
                        <div style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
                            Card content goes here...
                        </div>
                    </div>
                );

            case 'Icon':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: style.fontSize || 32,
                            color: style.color || '#6366f1',
                        }}
                    >
                        {content || '⭐'}
                    </div>
                );

            case 'Container':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: style.backgroundColor || '#f3f4f6',
                            borderRadius: style.borderRadius || 12,
                            border: `${style.borderWidth || 1}px ${style.borderWidth ? 'dashed' : 'solid'} ${style.borderColor || '#e5e7eb'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9ca3af',
                            fontSize: 14,
                            boxSizing: 'border-box',
                        }}
                    >
                        📦 Container
                    </div>
                );

            case 'Switch':
                const isOn = style.isOn !== false;
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: isOn ? (style.backgroundColor || '#6366f1') : '#d1d5db',
                            borderRadius: style.borderRadius || 16,
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 2,
                                left: isOn ? 'calc(100% - 28px)' : '2px',
                                width: 26,
                                height: 26,
                                backgroundColor: '#ffffff',
                                borderRadius: '50%',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                transition: 'left 0.2s',
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            position={{ x: element.style.x, y: element.style.y }}
            onStop={handleDragStop}
            bounds="parent"
            cancel=".react-resizable-handle"
        >
            <div
                ref={nodeRef}
                className={`canvas-element ${isSelected ? 'selected' : ''}`}
                onClick={handleClick}
                style={{ position: 'absolute' }}
            >
                <ResizableBox
                    width={element.style.width}
                    height={element.style.height}
                    onResizeStop={handleResize}
                    minConstraints={[40, 24]}
                    maxConstraints={[343, 700]}
                    resizeHandles={isSelected ? ['se', 'e', 's'] : []}
                >
                    {renderElementContent()}
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export const Canvas: React.FC = () => {
    const { elements, selectElement } = useEditorStore();

    const handleCanvasClick = useCallback(() => {
        selectElement(null);
    }, [selectElement]);

    return (
        <div className="canvas-container">
            <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen" onClick={handleCanvasClick}>
                    {elements.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📱</div>
                            <div className="empty-state-text">
                                Click elements on the left to add them
                            </div>
                        </div>
                    ) : (
                        elements.map((element) => (
                            <CanvasElementWrapper key={element.id} element={element} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
