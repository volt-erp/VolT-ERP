document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
            nav.style.padding = '10px 0';
        } else {
            nav.classList.remove('shadow-lg');
            nav.style.padding = '15px 0';
        }
    });
});

function openDemo() {
    const overlay = document.getElementById('demoOverlay');
    const frame = document.getElementById('demoFrame');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Load the demo content (to be built in next phase)
    frame.src = 'demo/index.html';
}

function closeDemo() {
    const overlay = document.getElementById('demoOverlay');
    const frame = document.getElementById('demoFrame');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    frame.src = 'about:blank';
}
