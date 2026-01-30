import { ElementPalette } from '../components/ElementPalette';
import { Canvas } from '../components/Canvas';
import { PropertiesPanel } from '../components/PropertiesPanel';
import { CodePreview } from '../components/CodePreview';
import { useNavigate } from 'react-router-dom';

export const EditorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="editor-page">
            {/* Editor Header */}
            <header className="editor-header">
                <div className="editor-logo" onClick={() => navigate('/')}>
                    <span className="logo-icon">✦</span>
                    <span className="logo-text">Pixora</span>
                </div>
                <div className="editor-title">Untitled Project</div>
                <div className="editor-actions">
                    <button className="editor-btn">
                        💾 Save
                    </button>
                    <button className="editor-btn primary">
                        ⬇️ Export
                    </button>
                </div>
            </header>

            {/* Editor Content */}
            <div className="editor-content">
                {/* Left Panel - Element Palette */}
                <ElementPalette />

                {/* Center Panel - Canvas */}
                <Canvas />

                {/* Right Panel - Properties & Code */}
                <div className="panel right-panel">
                    <div className="panel-header">Properties</div>
                    <PropertiesPanel />
                    <CodePreview />
                </div>
            </div>
        </div>
    );
};
