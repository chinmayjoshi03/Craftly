import React, { useCallback, useMemo } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { generateReactNativeCode } from '../generators/reactNativeGenerator';

export const CodePreview: React.FC = () => {
    const elements = useEditorStore((state) => state.elements);

    const code = useMemo(() => generateReactNativeCode(elements), [elements]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            alert('Code copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [code]);

    const handleDownload = useCallback(() => {
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Screen.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [code]);

    // Simple syntax highlighting
    const highlightedCode = useMemo(() => {
        return code
            .replace(/(import|from|export|default|const|function|return)/g, '<span class="keyword">$1</span>')
            .replace(/('.*?')/g, '<span class="string">$1</span>')
            .replace(/(\d+)/g, '<span class="number">$1</span>')
            .replace(/(style|styles|container)/g, '<span class="property">$1</span>')
            .replace(/(<\/?[A-Z][a-zA-Z]*)/g, '<span class="component">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    }, [code]);

    return (
        <div className="code-panel">
            <div className="code-header">
                <span className="code-title">React Native Code</span>
                <div className="code-actions">
                    <button className="code-btn" onClick={handleCopy}>
                        📋 Copy
                    </button>
                    <button className="code-btn" onClick={handleDownload}>
                        ⬇️ Download
                    </button>
                </div>
            </div>
            <div className="code-content">
                <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </div>
        </div>
    );
};
