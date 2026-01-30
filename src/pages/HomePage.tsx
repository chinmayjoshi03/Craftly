import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            {/* Animated background */}
            <div className="home-bg">
                <div className="home-bg-gradient" />
                <div className="home-bg-grid" />
                <div className="home-bg-glow" />
            </div>

            {/* Navigation */}
            <nav className="home-nav">
                <div className="home-logo">
                    <span className="logo-icon">✦</span>
                    <span className="logo-text">Craftly</span>
                </div>
                <div className="home-nav-links">
                    <a onClick={() => scrollToSection('features')}>Features</a>
                    <a onClick={() => scrollToSection('how-it-works')}>How it Works</a>
                    <button className="nav-cta" onClick={() => navigate('/editor')}>
                        Start Building
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        No-Code Mobile App Builder
                    </div>
                    <h1 className="hero-title">
                        Design Apps Visually,
                        <br />
                        <span className="gradient-text">Ship Code Instantly</span>
                    </h1>
                    <p className="hero-subtitle">
                        Create stunning React Native & Flutter apps with drag-and-drop.
                        No prompts, no learning curve — just pure visual magic.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => navigate('/editor')}>
                            <span>Start Creating</span>
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">8+</span>
                            <span className="stat-label">UI Components</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-number">Real-time</span>
                            <span className="stat-label">Code Sync</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Free Forever</span>
                        </div>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="hero-visual">
                    <div className="phone-mockup">
                        <div className="phone-screen-preview">
                            <div className="preview-element preview-header">✦ My App</div>
                            <div className="preview-element preview-card">
                                <div className="preview-card-title">Welcome!</div>
                                <div className="preview-card-text">Start building your dream app</div>
                            </div>
                            <div className="preview-element preview-button">Get Started</div>
                            <div className="preview-element preview-input">Enter email...</div>
                        </div>
                    </div>
                    <div className="code-preview-mockup">
                        <div className="code-header-bar">
                            <span className="code-dot red" />
                            <span className="code-dot yellow" />
                            <span className="code-dot green" />
                            <span className="code-filename">Screen.tsx</span>
                        </div>
                        <pre className="code-content-preview">
                            {`import { View, Text } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome!
      </Text>
    </View>
  );
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-badge">✨ Features</div>
                <h2 className="section-title">Everything You Need</h2>
                <p className="section-subtitle">Powerful tools to bring your app ideas to life</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Visual Editor</h3>
                        <p>Drag and drop components onto a real mobile canvas</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Instant Code</h3>
                        <p>Watch React Native code generate as you design</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Live Preview</h3>
                        <p>See exactly how your app looks on device</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Pixel Perfect</h3>
                        <p>Resize and position with precision control</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🖼️</div>
                        <h3>Image Support</h3>
                        <p>Upload images from gallery or paste URLs</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📦</div>
                        <h3>Export Code</h3>
                        <p>Download production-ready code instantly</p>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="how-section">
                <div className="section-badge">🚀 Simple Process</div>
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">From idea to code in 3 simple steps</p>

                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Drag Elements</h3>
                        <p>Choose from buttons, text, images, cards, inputs and more</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Customize</h3>
                        <p>Style, resize, and position your components perfectly</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Export</h3>
                        <p>Download clean React Native or Flutter code</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <div className="cta-icon">✦</div>
                    <h2>Ready to Build Something Amazing?</h2>
                    <p>Start creating your mobile app in minutes, not months.</p>
                    <button className="btn-primary large" onClick={() => navigate('/editor')}>
                        <span>Open Editor</span>
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className="logo-icon">✦</span>
                        <span className="logo-text">Craftly</span>
                    </div>
                    <p className="footer-text">Design visually. Ship code instantly.</p>
                </div>
            </footer>
        </div>
    );
};
