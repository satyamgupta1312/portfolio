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

// ===== CV Download =====
document.getElementById('downloadCV').addEventListener('click', (e) => {
    e.preventDefault();
    const cvHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Satyam Gupta - CV</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;line-height:1.6;max-width:800px;margin:0 auto;padding:40px 48px;font-size:11.5pt}
h1{font-size:22pt;font-weight:700;margin-bottom:2px}
.subtitle{font-size:11pt;color:#6366f1;font-weight:600;margin-bottom:4px}
.links{font-size:9pt;color:#555;margin-bottom:16px}
.links a{color:#6366f1;text-decoration:none}
.links span{margin:0 6px;color:#ccc}
hr{border:none;border-top:2px solid #6366f1;margin:12px 0 16px}
h2{font-size:12pt;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;margin-top:20px}
h3{font-size:11pt;font-weight:700;margin-bottom:2px}
.role-date{display:flex;justify-content:space-between;align-items:center}
.date{font-size:9.5pt;color:#888;font-weight:500}
.company{font-size:10pt;color:#555;font-style:italic;margin-bottom:6px}
ul{padding-left:18px;margin-bottom:10px}
li{font-size:10.5pt;margin-bottom:3px;color:#333}
.skills-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.skill-cat{font-weight:600;font-size:10pt;min-width:160px}
.skill-val{font-size:10pt;color:#333}
.project{margin-bottom:10px}
.project-title{font-weight:700;font-size:10.5pt}
.project-desc{font-size:10pt;color:#444}
.project-tech{font-size:9pt;color:#6366f1;font-style:italic}
.note{font-size:9pt;color:#888;font-style:italic;margin-bottom:14px}
.edu-row{display:flex;justify-content:space-between;margin-bottom:4px}
.edu-row span:last-child{color:#888;font-size:10pt}
@media print{body{padding:20px 32px}h1{font-size:20pt}}
</style></head><body>

<h1>SATYAM GUPTA</h1>
<p class="subtitle">Product Engineer</p>
<p class="links">
<a href="mailto:satyamgupta1312@gmail.com">satyamgupta1312@gmail.com</a>
<span>|</span>+91 8987725306
<span>|</span><a href="https://www.linkedin.com/in/satyam-gupta-a0737a1a5/">LinkedIn</a>
<span>|</span><a href="https://satyamgupta-portfolio.vercel.app">satyamgupta-portfolio.vercel.app</a>
<span>|</span><a href="https://github.com/satyamgupta1312">GitHub</a>
</p>

<hr>

<h2>Professional Summary</h2>
<p style="font-size:10.5pt;color:#333;margin-bottom:8px">Product Engineer with 4+ years at The Fleets Labs (Apna Mart). Built full-stack products, automated workflows, and led teams — rapidly promoted through 6+ roles. Skilled in Python, TypeScript, React, SQL, and AI-assisted development.</p>

<h2>Technical Skills</h2>
<div style="margin-bottom:6px"><span class="skill-cat">Development:</span> <span class="skill-val">Python, TypeScript, JavaScript, Kotlin, SQL, React, NestJS, Express, FastAPI, Flask, Apps Script</span></div>
<div style="margin-bottom:6px"><span class="skill-cat">Tools & Infra:</span> <span class="skill-val">Docker, Supabase, PostgreSQL, Redis, Tailwind CSS, Figma, Vercel, Git</span></div>
<div style="margin-bottom:6px"><span class="skill-cat">Data & Analytics:</span> <span class="skill-val">SQL, MS Excel (Advanced), Mixpanel, API Integration</span></div>
<div style="margin-bottom:6px"><span class="skill-cat">AI & Other:</span> <span class="skill-val">ChatGPT, Claude, AI-Assisted Development, Prompt Engineering, UAT, QA</span></div>
<div style="margin-bottom:12px"><span class="skill-cat">Languages:</span> <span class="skill-val">English, Hindi</span></div>

<h2>Projects</h2>
<p class="note">Code is AI-assisted — logic, product thinking, architecture, and user flows are entirely mine.</p>

<div class="project"><span class="project-title">Optimus — Widget CMS for App Homepage</span> <span class="date">(Apna Mart)</span><br><span class="project-desc">WYSIWYG drag-and-drop CMS for consumer app homepage. Config-driven widget system (Product Rails, Banners, Mastheads) with phone emulator preview, Maker-Checker approval workflow, undo/redo, version history, PROD/UAT support.</span><br><span class="project-tech">React 19, Express, Supabase, @dnd-kit, Tailwind CSS, Vercel</span></div>

<div class="project"><span class="project-title">istrE3 — On-Demand Ironing Service</span> <span class="date">(Apna Mart — New Business Model)</span><br><span class="project-desc">Full-stack platform with 20+ state order machine, QR bag scanning, rider assignment, hub zones, real-time WebSocket tracking, OTP flows.</span><br><span class="project-tech">NestJS, React, PostgreSQL, Redis, Docker, Prisma</span></div>

<div class="project"><span class="project-title">SAM — Price Benchmark (Anakin Replacement)</span> <span class="date">(Apna Mart — Saving ₹36L/year)</span><br><span class="project-desc">In-house replacement for Anakin (₹3L/month service). Scrapes 5 quick-commerce platforms, compares 3,600+ SKUs via 4-stage matching pipeline (PDP direct, brand cascade, type/MRP cascade, manual review). Multi-city orchestration, API interception, styled Excel exports.</span><br><span class="project-tech">Python, FastAPI, Playwright, React, SSE, openpyxl</span></div>

<div class="project"><span class="project-title">TrackMate + Admin Dashboard</span><br><span class="project-desc">Real-time GPS tracking Android app with background service + web admin panel with Leaflet maps, geofence zones, route history.</span><br><span class="project-tech">Kotlin, Jetpack Compose, React 19, Leaflet, Supabase</span></div>

<div class="project"><span class="project-title">Geofence Bot — Slack Automation</span> <span class="date">(Apna Mart)</span><br><span class="project-desc">Slack bot for automated geofence updates. Parses WKT geometry, approval workflow with map screenshots, deploys to ApnaMart API.</span><br><span class="project-tech">Python, Flask, Slack SDK, Shapely</span></div>

<h2>Professional Experience</h2>
<p class="company">The Fleets Labs Technologies Pvt. Ltd. (Apna Mart) — Rapidly promoted through 6+ roles</p>

<div class="role-date"><h3>Product Engineer</h3><span class="date">Present</span></div>
<ul><li>Building and engineering product solutions, driving technical implementation end-to-end.</li><li>Collaborating cross-functionally to design, develop, and ship product features.</li></ul>

<div class="role-date"><h3>Automation Product Manager</h3><span class="date">Sep 2025</span></div>
<ul><li>Spearheaded automation using JavaScript (Apps Script) and Python to reduce manual tasks.</li><li>Automated data flows between spreadsheets and external APIs (CleverTap, Singular).</li><li>Built automated dashboards for product KPIs and engagement metrics.</li></ul>

<div class="role-date"><h3>Product Ops</h3><span class="date">Feb 2024 – Aug 2025</span></div>
<ul><li>Bridged support and product teams using Mixpanel for behavior analysis.</li><li>Identified bugs and feature requests, prioritizing with SQL-based data validation.</li></ul>

<div class="role-date"><h3>Tech Support</h3><span class="date">Feb 2023 – Jan 2024</span></div>
<ul><li>Resolved complex technical issues. Collaborated with QA for UAT.</li></ul>

<div class="role-date"><h3>GRN & Audit Lead / SLA Manager / Trainer</h3><span class="date">Mar 2022 – Feb 2023</span></div>
<ul><li>Led Audit Team to 100% compliance. Managed SLA for online orders. Trained staff.</li></ul>

<h2>Education</h2>
<div class="edu-row"><span><strong>Bachelor of Commerce</strong> — IGNOU</span><span>Pursuing</span></div>
<div class="edu-row"><span><strong>Intermediate (12th)</strong> — Gossner College, Ranchi</span><span>2020</span></div>
<div class="edu-row"><span><strong>Matriculation (10th)</strong> — International Public School</span><span>2018</span></div>

</body></html>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(cvHTML);
    printWindow.document.close();
    printWindow.onload = () => {
        printWindow.print();
    };
});
