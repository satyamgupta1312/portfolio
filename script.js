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
function generateCV() {
    const cvHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Satyam_Gupta_Resume</title>
<style>
@page{margin:14mm 16mm}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Calibri,'Segoe UI',Arial,sans-serif;color:#222;line-height:1.45;font-size:10pt;padding:0}
a{color:#222;text-decoration:none}
h1{font-size:18pt;font-weight:700;letter-spacing:0.5px;margin-bottom:1px}
.title{font-size:10.5pt;font-weight:600;color:#444;margin-bottom:3px}
.contact{font-size:8.5pt;color:#555;margin-bottom:8px}
.contact a{color:#1a56db}
.divider{border:none;border-top:1.5px solid #222;margin:6px 0 8px}
h2{font-size:10pt;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #ccc;padding-bottom:2px;margin:10px 0 6px;color:#222}
.row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px}
.row h3{font-size:10pt;font-weight:700}
.row .date{font-size:8.5pt;color:#666}
.company-line{font-size:9pt;color:#555;margin-bottom:3px}
ul{padding-left:16px;margin:2px 0 6px}
li{font-size:9.5pt;margin-bottom:1.5px;color:#333}
.skills-grid{display:grid;grid-template-columns:130px 1fr;gap:2px 8px;font-size:9.5pt;margin-bottom:2px}
.sk-label{font-weight:700;color:#222}
.sk-value{color:#333}
.proj{margin-bottom:5px}
.proj-head{display:flex;justify-content:space-between;align-items:baseline}
.proj-title{font-size:9.5pt;font-weight:700}
.proj-co{font-size:8.5pt;color:#666}
.proj-desc{font-size:9pt;color:#444;margin:1px 0}
.proj-tech{font-size:8pt;color:#1a56db}
.note{font-size:8pt;color:#888;font-style:italic;margin-bottom:5px}
.edu-row{display:flex;justify-content:space-between;font-size:9.5pt;margin-bottom:2px}
.interests{font-size:9pt;color:#444}
</style>
<script>window.onload=function(){window.print()}<\/script>
</head><body>

<h1>SATYAM GUPTA</h1>
<p class="title">Product Engineer | Automation & Product Operations</p>
<p class="contact">+91 8987725306 &nbsp;|&nbsp; <a href="mailto:satyamgupta1312@gmail.com">satyamgupta1312@gmail.com</a> &nbsp;|&nbsp; <a href="https://www.linkedin.com/in/satyam-gupta-a0737a1a5/">linkedin.com/in/satyam-gupta</a> &nbsp;|&nbsp; <a href="https://satyamgupta-portfolio.vercel.app">satyamgupta-portfolio.vercel.app</a> &nbsp;|&nbsp; <a href="https://github.com/satyamgupta1312">github.com/satyamgupta1312</a></p>
<hr class="divider">

<h2>Summary</h2>
<p style="font-size:9.5pt;color:#333;margin-bottom:4px">Product Engineer with 4+ years of experience in product management, process automation, and full-stack development. Rapidly promoted through 6+ roles at Apna Mart (The Fleets Labs). Expertise in building internal tools, automating workflows, data analysis, and cross-functional collaboration. Proven ability to identify user pain points, define product requirements, ship features end-to-end, and drive measurable business impact. Skilled in Agile, stakeholder management, and data-driven decision making.</p>

<h2>Professional Experience</h2>
<p class="company-line"><strong>The Fleets Labs Technologies Pvt. Ltd. (Apna Mart)</strong> &nbsp;|&nbsp; <em>Rapidly promoted through 6+ roles</em></p>

<div class="row"><h3>Product Engineer</h3><span class="date">Present</span></div>
<ul>
<li>Own end-to-end product development lifecycle — from requirement gathering and PRD creation to development, testing, and deployment.</li>
<li>Designed and built Optimus, a drag-and-drop Widget CMS used daily by operations and marketing teams to manage the consumer app homepage, eliminating developer dependency.</li>
<li>Architected a new business vertical (on-demand ironing service) — defined user flows, state machines, and full-stack implementation with 20+ order states.</li>
</ul>

<div class="row"><h3>Automation Product Manager</h3><span class="date">Sep 2025</span></div>
<ul>
<li>Led automation initiatives that reduced manual operational tasks by building Python and Google Apps Script workflows.</li>
<li>Automated marketing data pipelines between internal systems and external APIs (CleverTap, Singular), reducing manual reporting effort by 80%.</li>
<li>Built automated dashboards for tracking product KPIs, user engagement metrics, and operational health.</li>
<li>Developed SAM (Price Benchmark tool) saving the company ₹36 lakh/year by replacing a third-party competitor pricing service.</li>
</ul>

<div class="row"><h3>Product Ops</h3><span class="date">Feb 2024 – Aug 2025</span></div>
<ul>
<li>Bridged gap between support and product teams; used Mixpanel analytics to identify user behavior trends, friction points, and feature opportunities.</li>
<li>Prioritized 50+ bug fixes and feature requests for engineering using SQL-based data validation and user impact analysis.</li>
<li>Optimized internal workflows resulting in 30% faster ticket resolution and smoother product launches.</li>
</ul>

<div class="row"><h3>Tech Support</h3><span class="date">Feb 2023 – Jan 2024</span></div>
<ul>
<li>Resolved complex technical issues for users, maintaining high CSAT scores. Collaborated with QA team on User Acceptance Testing (UAT).</li>
</ul>

<div class="row"><h3>GRN & Audit Lead / SLA Manager / Trainer</h3><span class="date">Mar 2022 – Feb 2023</span></div>
<ul>
<li>Led Audit Team achieving 100% compliance with inventory standards. Managed SLA for online orders ensuring on-time delivery. Trained 20+ staff members.</li>
</ul>

<h2>Key Projects</h2>
<p class="note">Code is AI-assisted — product thinking, logic, architecture, and user flows are entirely mine.</p>

<div class="proj"><div class="proj-head"><span class="proj-title">Optimus — Widget CMS for Consumer App Homepage</span><span class="proj-co">Apna Mart</span></div>
<p class="proj-desc">WYSIWYG drag-and-drop CMS with config-driven widget system, phone emulator preview, Maker-Checker approval workflow, undo/redo, version history, and multi-environment (PROD/UAT) deployment.</p>
<p class="proj-tech">React 19 | Express | Supabase | @dnd-kit | Tailwind CSS | Vercel</p></div>

<div class="proj"><div class="proj-head"><span class="proj-title">SAM — Price Benchmark (Competitor Price Tracking)</span><span class="proj-co">Apna Mart — Saving ₹36L/yr</span></div>
<p class="proj-desc">Playwright browser automation scraping 5 quick-commerce platforms, comparing 3,600+ SKUs via 4-stage matching pipeline. Multi-city orchestration, API interception, anti-detection, styled Excel exports.</p>
<p class="proj-tech">Python | FastAPI | Playwright | React | SSE | openpyxl</p></div>

<div class="proj"><div class="proj-head"><span class="proj-title">istrE3 — On-Demand Ironing Service Platform</span><span class="proj-co">Apna Mart — New Business Model</span></div>
<p class="proj-desc">Full-stack platform with 20+ state order machine, QR bag scanning, rider assignment, hub zone management, real-time WebSocket tracking, OTP-based pickup/delivery.</p>
<p class="proj-tech">NestJS | React | PostgreSQL | Redis | Docker | Prisma</p></div>

<div class="proj"><div class="proj-head"><span class="proj-title">TrackMate — Real-Time GPS Tracking System</span><span class="proj-co">Personal</span></div>
<p class="proj-desc">Android app with background GPS tracking + web admin dashboard with interactive maps, geofence zone management, route history visualization.</p>
<p class="proj-tech">Kotlin | Jetpack Compose | React 19 | Leaflet | Supabase</p></div>

<div class="proj"><div class="proj-head"><span class="proj-title">Geofence Bot — Slack Workflow Automation</span><span class="proj-co">Apna Mart</span></div>
<p class="proj-desc">Slack bot automating store geofence updates with WKT parsing, approval workflow, map verification, and API deployment.</p>
<p class="proj-tech">Python | Flask | Slack SDK | Shapely</p></div>

<h2>Technical Skills</h2>
<div class="skills-grid">
<span class="sk-label">Languages:</span><span class="sk-value">Python, TypeScript, JavaScript, Kotlin, SQL, HTML/CSS</span>
<span class="sk-label">Frameworks:</span><span class="sk-value">React, NestJS, Express, FastAPI, Flask, Jetpack Compose, Tailwind CSS</span>
<span class="sk-label">Tools & Infra:</span><span class="sk-value">Docker, Git, Vercel, Supabase, PostgreSQL, Redis, Playwright, Figma</span>
<span class="sk-label">Data & Analytics:</span><span class="sk-value">SQL, MS Excel (Advanced), Mixpanel, API Integration, Pydantic</span>
<span class="sk-label">Product Skills:</span><span class="sk-value">PRD, User Stories, Wireframing, A/B Testing, Agile/Scrum, JIRA, Stakeholder Management</span>
<span class="sk-label">AI & Prompting:</span><span class="sk-value">ChatGPT, Claude, AI-Assisted Development, Prompt Engineering</span>
<span class="sk-label">QA:</span><span class="sk-value">User Acceptance Testing (UAT), Software Quality Assurance, Bug Triage</span>
</div>

<h2>Education</h2>
<div class="edu-row"><span><strong>Bachelor of Commerce</strong> — Indira Gandhi National Open University (IGNOU)</span><span>Pursuing</span></div>
<div class="edu-row"><span><strong>Intermediate (12th)</strong> — Gossner College, Ranchi</span><span>2020</span></div>
<div class="edu-row"><span><strong>Matriculation (10th)</strong> — International Public School</span><span>2018</span></div>

<h2>Interests</h2>
<p class="interests">Data Automation & Scripting, Product Strategy, AI Tools, Strategy Gaming, Music</p>

</body></html>`;

    const blob = new Blob([cvHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Satyam_Gupta_Resume.html';
    a.click();
    URL.revokeObjectURL(url);

    // Also open for print-to-PDF
    setTimeout(() => {
        const printWin = window.open('', '_blank');
        printWin.document.write(cvHTML);
        printWin.document.close();
    }, 500);
}

document.getElementById('downloadCV').addEventListener('click', (e) => {
    e.preventDefault();
    generateCV();
});

document.getElementById('downloadCVMain').addEventListener('click', (e) => {
    e.preventDefault();
    generateCV();
});
