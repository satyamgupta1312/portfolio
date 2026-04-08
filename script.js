// ===== Mouse Parallax Engine =====
const parallaxScene = document.getElementById('parallaxScene');
const layers = document.querySelectorAll('.parallax-layer');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
});

function animateParallax() {
    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth);
        const moveX = currentX * depth * 80;
        const moveY = currentY * depth * 80;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    requestAnimationFrame(animateParallax);
}

animateParallax();

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
});

function animateCursor() {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hide cursor glow when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});

// ===== Photo Expand on Avatar Click =====
const avatarImg = document.querySelector('.sidebar-avatar');
const photoOverlay = document.getElementById('photoOverlay');
const photoClose = document.getElementById('photoClose');
const photoOverlayBg = document.querySelector('.photo-overlay-bg');

if (avatarImg && photoOverlay) {
    avatarImg.addEventListener('click', (e) => {
        e.preventDefault();
        photoOverlay.classList.add('active');
    });

    photoClose.addEventListener('click', () => {
        photoOverlay.classList.remove('active');
    });

    photoOverlayBg.addEventListener('click', () => {
        photoOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') photoOverlay.classList.remove('active');
    });
}

// ===== Mobile Sidebar Toggle =====
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
});

sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        sidebar.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !sidebar.contains(e.target)) {
        navToggle.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// ===== Scroll Reveal (AOS) =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => revealObserver.observe(el));

// ===== Timeline Items Stagger =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = Array.from(timelineItems).indexOf(entry.target);
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, idx * 120);
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.metric-value[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 40);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== Subtle Tilt Effect on Cards =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Active Sidebar Link =====
const sections = document.querySelectorAll('.section');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
