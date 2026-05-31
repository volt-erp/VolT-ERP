document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function openDemo() {
    const overlay = document.getElementById('demoOverlay');
    const frame = document.getElementById('demoFrame');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    frame.src = 'demo/index.html';
}

function closeDemo() {
    const overlay = document.getElementById('demoOverlay');
    const frame = document.getElementById('demoFrame');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    frame.src = 'about:blank';
}

// Close demo on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDemo();
    }
});
