:root {
    --bg-color: #05080e;
    --surface-color: #0e141d;
    --surface-light: #161e2b;
    --primary-color: #00E5FF;
    --primary-hover: #00b3cc;
    --text-main: #f0f4f8;
    --text-muted: #8b9eb0;
    --border-color: rgba(0, 229, 255, 0.15);
    --glow: 0 0 20px rgba(0, 229, 255, 0.3);
    --font-family: 'Cairo', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Typography */
h1, h2, h3 { font-weight: 700; }
a { text-decoration: none; color: inherit; }

/* Buttons */
.btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    font-size: 1rem;
}

.btn-primary {
    background-color: var(--primary-color);
    color: #000;
    box-shadow: var(--glow);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.5);
    transform: translateY(-2px);
}

.btn-outline {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.btn-outline:hover {
    background-color: rgba(0, 229, 255, 0.1);
    transform: translateY(-2px);
}

.full-width { width: 100%; }

/* Header */
.navbar {
    padding: 20px 0;
    background: rgba(5, 8, 14, 0.8);
    backdrop-filter: blur(10px);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid var(--border-color);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary-color);
    letter-spacing: 1px;
}

.logo img { width: 40px; height: 40px; object-fit: contain;}

.nav-links {
    display: flex;
    gap: 30px;
}

.nav-links a {
    color: var(--text-main);
    font-weight: 600;
    transition: color 0.3s;
}

.nav-links a:hover { color: var(--primary-color); }

/* Hero Section */
.hero {
    padding: 160px 0 100px;
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.glow-bg {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(5,8,14,0) 70%);
    z-index: -1;
    pointer-events: none;
}

.hero-container {
    display: flex;
    align-items: center;
    gap: 50px;
}

.hero-content {
    flex: 1;
}

.hero-title {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 20px;
    background: linear-gradient(to left, #fff, var(--primary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 40px;
    max-width: 90%;
}

.hero-actions {
    display: flex;
    gap: 15px;
}

/* Mockups CSS */
.hero-visual {
    flex: 1;
    position: relative;
    perspective: 1000px;
    height: 500px;
}

.mockup-pc {
    position: absolute;
    width: 600px;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotateY(-15deg);
    border-radius: 12px;
    background: var(--surface-light);
    padding: 10px 10px 25px;
    border: 1px solid #2a3441;
    box-shadow: -20px 20px 50px rgba(0,0,0,0.8);
}

.mockup-pc .screen {
    width: 100%;
    height: 320px;
    background: #000;
    border-radius: 6px;
    overflow: hidden;
}

.mockup-pc .screen img { width: 100%; height: 100%; object-fit: cover; }

.mockup-mobile {
    position: absolute;
    width: 180px;
    height: 380px;
    right: 20px;
    bottom: 20px;
    background: var(--surface-light);
    border-radius: 24px;
    padding: 8px;
    border: 2px solid #334155;
    box-shadow: -10px 10px 30px rgba(0,0,0,0.9);
    transform: rotateY(-10deg) translateZ(50px);
    z-index: 2;
}

.mockup-mobile .screen {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 16px;
    overflow: hidden;
}

.mockup-mobile .screen img { width: 100%; height: 100%; object-fit: cover; }

/* Features Section */
.features-section {
    padding: 100px 0;
    background-color: var(--surface-color);
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.section-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
}

.feature-card {
    background: var(--surface-light);
    padding: 30px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s, border-color 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
}

.feature-card .icon {
    width: 50px;
    height: 50px;
    background: rgba(0, 229, 255, 0.1);
    color: var(--primary-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.feature-card h3 {
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.feature-card p {
    color: var(--text-muted);
    font-size: 0.95rem;
}

/* Demo Modal (Mini ERP) */
.demo-modal {
    display: none; /* Hidden by default */
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(15px);
    z-index: 1000;
    padding: 20px;
    align-items: center;
    justify-content: center;
}

.demo-modal.active { display: flex; }

.demo-container {
    width: 100%;
    max-width: 1200px;
    height: 90vh;
    background: var(--surface-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    animation: fadeInScale 0.4s ease forwards;
}

@keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}

.demo-header {
    background: #0a0f16;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.close-demo {
    color: #ff4757;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.3s;
}

.close-demo:hover { filter: brightness(1.2); }

/* Demo Login */
.demo-login-screen {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('data:image/svg+xml;utf8,<svg opacity="0.05" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2300E5FF"/></svg>') center/cover;
}

.login-box {
    background: var(--surface-light);
    padding: 40px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.05);
}

.login-box h2 { margin-bottom: 30px; font-size: 1.5rem;}
.input-group { margin-bottom: 20px; text-align: right; }
.input-group label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem;}
.input-group input {
    width: 100%; padding: 12px; border-radius: 6px;
    background: #0a0f16; border: 1px solid #2a3441;
    color: #fff; font-family: inherit;
}

/* Demo Dashboard */
.demo-dashboard-screen {
    flex: 1;
    display: flex;
}

.demo-dashboard-screen.hidden { display: none; }

.demo-sidebar {
    width: 250px;
    background: #0a0f16;
    border-left: 1px solid rgba(255,255,255,0.05);
    padding: 20px 0;
}

.sidebar-item {
    padding: 15px 20px;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: 0.3s;
}

.sidebar-item:hover, .sidebar-item.active {
    background: rgba(0, 229, 255, 0.05);
    color: var(--primary-color);
    border-right: 3px solid var(--primary-color);
}

.demo-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--bg-color);
}

.demo-topbar {
    padding: 15px 30px;
    background: var(--surface-light);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    text-align: left;
}

.demo-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.demo-img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
}

/* Footer */
footer {
    padding: 40px 0;
    text-align: center;
    border-top: 1px solid var(--border-color);
}

.footer-logo {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: 10px;
}

/* Responsive */
@media (max-width: 992px) {
    .hero-container { flex-direction: column; text-align: center; }
    .hero-actions { justify-content: center; }
    .hero-visual { width: 100%; height: 400px; margin-top: 40px;}
    .mockup-pc { width: 90%; left: 5%; transform: none; position: relative; top: 0;}
    .mockup-mobile { display: none; /* Hide mobile mockup on smaller screens for cleaner look */ }
    .demo-sidebar { display: none; }
}

@media (max-width: 768px) {
    .nav-links { display: none; }
    .hero-title { font-size: 2.5rem; }
    .hero-actions { flex-direction: column; }
    .mockup-pc { width: 100%; left: 0; }
}
