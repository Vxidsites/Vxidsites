// Mock Data for VxidSites

const mockProjects = [
    { 
        id: "vxid-tweaks",
        title: "Vxid Tweaks", 
        desc: "The ultimate PC optimization batch script. Lowers input lag by ~4% and increases FPS by ~1-3%.", 
        longDesc: "Vxid Tweaks is a comprehensive Windows optimization script designed to maximize gaming performance. It forces GPU prioritization, eliminates background telemetry, disables network throttling, and injects TCPNoDelay for the absolute lowest possible latency.",
        features: ["Disables Nagle's Algorithm for lower ping", "Removes Network Throttling limits", "Unlocks hidden Ultimate Performance Power Plan", "Kills background diagnostic tracking"],
        icon: "fa-terminal", 
        tech: ["Batch", "Registry", "Windows"], 
        status: "Live", 
        statusClass: "completed",
        download: "VxidTweaks.zip",
        image: "tweaks_screenshot.png"
    }
];

const mockDownloads = [
    { 
        title: "Vxid Tweaks (Batch)", 
        desc: "The ultimate PC optimization script. Lowers input lag by ~4% and increases FPS by ~1-3%. Includes a 100% safe Revert option.", 
        meta: "11 KB - Script", 
        category: "scripts", 
        file: "VxidTweaks.zip" 
    }
];

const mockVideos = [
    { title: "SKLauncher Setup", url: "https://www.youtube.com/watch?v=J0WEqQhg6_A&t=2s", id: "J0WEqQhg6_A", category: "hacked-clients" },
    { title: "YimMenu V2 GTA Mod Menu", url: "https://www.youtube.com/watch?v=3IDIbszLATM&t=23s", id: "3IDIbszLATM", category: "gta" },
    { title: "Cayo Replay Money Glitch", url: "https://www.youtube.com/watch?v=yWBlp6vId9k", id: "yWBlp6vId9k", category: "gta" },
    { title: "Share Xbox Game Pass", url: "https://www.youtube.com/watch?v=09d5_2EO5gs", id: "09d5_2EO5gs", category: "tutorials" }
];

const mockUpcoming = [
    { 
        title: "Vxid Mod Launcher", 
        date: "Winter 2026", 
        desc: "Currently developing a standalone Windows desktop application to manage GTA 5 mods, scripts, and services automatically. Will feature one-click installs and backups.", 
        progress: 35 
    }
];

const mockChangelog = [
    { 
        version: "v1.2", 
        date: "August 2026", 
        desc: "Launched the new GTA 5 Services tab! Added premium Heist carry packages and a free trial system. Revamped the entire website UI with a darker, high-contrast aesthetic." 
    },
    { 
        version: "v1.1", 
        date: "August 2026", 
        desc: "Added the brand new Vxid Tweaks batch script to the downloads library. A powerful new script for crushing input lag and increasing FPS." 
    }
];

// Navigation Logic
window.currentActiveSection = 'home'; // Track state for DNA

function navigateTo(sectionId) {
    window.currentActiveSection = sectionId;
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId || (sectionId === 'project-details' && link.getAttribute('data-section') === 'projects')) {
            link.classList.add('active');
        }
    });

    // Hide all sections, show target
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    
    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('mobile-open');
}

// GTA 5 Services Form Logic
function submitSocialClub() {
    const input = document.getElementById('sc-input');
    if (input && input.value.trim() !== '') {
        const username = input.value.trim();
        alert(`Request received for Social Club: ${username}!\nWe will get your free heist done shortly.`);
        input.value = '';
    }
}

// Data Injection Functions
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    if (mockProjects.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center;">More projects coming soon.</p>`;
        return;
    }

    container.innerHTML = mockProjects.map(p => `
        <div class="project-card glass fade-in">
            <div class="project-img" ${p.image ? `style="background-image: url('${p.image}'); background-size: cover; background-position: top left;"` : ''}>
                ${p.image ? '' : `<i class="fas ${p.icon}"></i>`}
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.desc}</p>
            <div class="project-tech">
                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <div class="project-meta">
                <span class="status ${p.statusClass}">${p.status}</span>
            </div>
            <div class="project-links">
                <button class="btn btn-primary" style="flex: 1; text-align: center;" onclick="viewProjectDetails('${p.id}')">View Details</button>
            </div>
        </div>
    `).join('');
}

function viewProjectDetails(id) {
    const p = mockProjects.find(proj => proj.id === id);
    if (!p) return;
    
    document.getElementById('pd-title').innerText = p.title;
    document.getElementById('pd-desc').innerText = p.desc;
    document.getElementById('pd-longdesc').innerText = p.longDesc;
    
    const featuresList = document.getElementById('pd-features');
    if (p.features && p.features.length > 0) {
        featuresList.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
        document.getElementById('pd-features-container').style.display = 'block';
    } else {
        document.getElementById('pd-features-container').style.display = 'none';
    }
    
    const imgEl = document.getElementById('pd-image');
    if (p.image) {
        imgEl.src = p.image;
        imgEl.style.display = 'block';
    } else {
        imgEl.style.display = 'none';
    }
    
    const downloadBtn = document.getElementById('pd-download');
    if (p.download) {
        downloadBtn.href = p.download;
        downloadBtn.style.display = 'inline-block';
    } else {
        downloadBtn.style.display = 'none';
    }
    
    navigateTo('project-details');
}

function renderDownloads(category = 'all') {
    const container = document.getElementById('downloads-container');
    if (!container) return;
    
    if (mockDownloads.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center;">Downloads coming soon.</p>`;
        return;
    }

    const filtered = category === 'all' 
        ? mockDownloads 
        : mockDownloads.filter(d => d.category === category);

    container.innerHTML = filtered.map(d => `
        <div class="file-card glass fade-in">
            <div class="file-info">
                <h3>${d.title}</h3>
                <p>${d.desc}</p>
                <div class="file-meta">
                    <span><i class="fas fa-tag"></i> ${d.meta}</span>
                </div>
            </div>
            <a href="${d.file}" download class="btn btn-outline" style="display: flex; align-items: center; justify-content: center;"><i class="fas fa-download"></i></a>
        </div>
    `).join('');
}

function renderYouTube(category = 'all') {
    const container = document.getElementById('youtube-container');
    if (!container) return;
    
    const filtered = category === 'all' 
        ? mockVideos 
        : mockVideos.filter(v => v.category === category);

    if (filtered.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center;">More ${category.replace('-', ' ')} videos coming soon.</p>`;
        return;
    }

    container.innerHTML = filtered.map(v => `
        <a href="${v.url}" target="_blank" class="video-card glass fade-in" style="display: flex; flex-direction: column; text-decoration: none;">
            <div class="video-thumb" style="background-image: url('https://img.youtube.com/vi/${v.id}/hqdefault.jpg'); background-size: cover; background-position: center; border-radius: 8px 8px 0 0; flex: 1; min-height: 200px;">
                <i class="fab fa-youtube" style="z-index: 2; position: relative;"></i>
            </div>
            <div style="padding: 1rem; text-align: center; background: rgba(0,0,0,0.2); border-radius: 0 0 8px 8px;">
                <h4 style="color: var(--text-main); font-size: 0.95rem; margin: 0;">${v.title}</h4>
            </div>
        </a>
    `).join('');
}

function renderUpcoming() {
    const container = document.getElementById('upcoming-container');
    if (!container) return;
    
    if (mockUpcoming.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center;">More updates coming soon.</p>`;
        return;
    }

    container.innerHTML = mockUpcoming.map(u => `
        <div class="upcoming-card glass fade-in">
            <div class="upcoming-header">
                <h3>${u.title}</h3>
                <span style="color: var(--text-muted);">${u.date}</span>
            </div>
            <p style="color: var(--text-muted);">${u.desc}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${u.progress}%"></div>
            </div>
            <p style="font-size: 0.85rem; color: var(--accent-primary); text-align: right;">${u.progress}% Complete</p>
        </div>
    `).join('');
}

function renderChangelog() {
    const container = document.getElementById('changelog-container');
    if (!container) return;
    
    if (mockChangelog.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-left: -2rem;">Changelog updates coming soon.</p>`;
        return;
    }

    container.innerHTML = mockChangelog.map(c => `
        <div class="timeline-item fade-in">
            <div class="timeline-dot"></div>
            <div class="timeline-content glass" style="padding: 1.5rem;">
                <div class="timeline-date">${c.date}</div>
                <h3 style="color: var(--accent-primary); margin-bottom: 0.5rem;">${c.version}</h3>
                <p>${c.desc}</p>
            </div>
        </div>
    `).join('');
}

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', () => {
    
    // Hash-based routing
    const handleHash = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            navigateTo(hash);
        } else {
            navigateTo('home');
        }
    };

    window.addEventListener('hashchange', handleHash);
    
    // Navigation Clicks
    document.querySelectorAll('.nav-links a, .hero-buttons a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            if(document.getElementById(targetId)) {
                // Let the hashchange event handle the navigation, just update the URL hash
            }
        });
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if(navLinks) {
                // simple toggle inline style for mobile (ideally done via CSS class)
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '70px';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.background = 'var(--bg-main)';
                    navLinks.style.padding = '2rem';
                    navLinks.style.borderBottom = '1px solid var(--glass-border)';
                }
            }
        });
    }

    // Download Filters
    document.querySelectorAll('#download-categories .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#download-categories .filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderDownloads(e.target.getAttribute('data-category'));
        });
    });

    // YouTube Filters
    document.querySelectorAll('#youtube-categories .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#youtube-categories .filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderYouTube(e.target.getAttribute('data-category'));
        });
    });

    // Search bar (simple placeholder logic)
    const searchInput = document.getElementById('file-search');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const container = document.getElementById('downloads-container');
            const items = container.querySelectorAll('.file-card');
            items.forEach(item => {
                const text = item.querySelector('h3').innerText.toLowerCase();
                item.style.display = text.includes(term) ? 'flex' : 'none';
            });
        });
    }

    // Initialize initial views
    renderProjects();
    renderDownloads();
    renderYouTube();
    renderUpcoming();
    renderChangelog();
    handleHash();

    // --- Sidebar Proximity Logic ---
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        document.addEventListener('mousemove', (e) => {
            // Show sidebar if mouse is within 150px of the left edge, OR if mouse is over the sidebar
            if (e.clientX < 150 || sidebar.contains(e.target)) {
                sidebar.classList.add('show');
            } else {
                sidebar.classList.remove('show');
            }
        });
    }
});

// Crypto Modal Logic
function openCryptoModal(price) {
    const modal = document.getElementById('crypto-modal');
    const priceText = document.getElementById('modal-price');
    
    priceText.textContent = '$' + price;
    modal.classList.remove('hidden');
}

function closeCryptoModal() {
    const modal = document.getElementById('crypto-modal');
    modal.classList.add('hidden');
}

function copyCryptoAddress() {
    const address = document.getElementById('ltc-address').textContent;
    navigator.clipboard.writeText(address).then(() => {
        alert('Bitcoin Address copied to clipboard!');
    });
}

// Fake Reviews Data (8 reviews)
const mockReviews = [
    { author: "skylar33", rating: 5, text: "Vouch. Literally spawned outside the arcade and he hit a button and it was over. Easiest 3.1M ever." },
    { author: "jayson.x", rating: 4, text: "Bro wasn't lying. We loaded into the heist outside and he just instant finished it immediately." },
    { author: "kaylaa12", rating: 5, text: "Fastest run possible. We spawned in, screen went straight to Mission Passed, and 3.1M was in my bank." },
    { author: "drxg", rating: 5, text: "Legit. Didn't even have to get in a car, he just clicked instant finish right as we spawned." },
    { author: "marcus.d", rating: 4, text: "W service. You literally just load outside and he skips the entire mission giving u the 3 mil." },
    { author: "zayy99", rating: 5, text: "Bought the Pro tier. He instantly finished all 6 heists back to back right from the spawn screen." },
    { author: "vinceee", rating: 3, text: "Thought it was a scam but nah we loaded in outside and the heist just ended giving me 3.1m free." },
    { author: "al3x", rating: 5, text: "Spawned in, he clicked instant finish, got my 3.1M for free. 10/10." }
];

let currentReviewIndex = 0;
let reviewInterval;

function renderReviews() {
    const dotsContainer = document.getElementById('slider-dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = mockReviews.map((_, i) => `
            <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToReview(${i})"></div>
        `).join('');
    }
    updateSliderPosition();
    startReviewSlider();
}

function updateSliderPosition() {
    const display = document.getElementById('single-review-display');
    if (!display) return;
    
    // Fade out
    display.style.opacity = '0';
    
    setTimeout(() => {
        const r = mockReviews[currentReviewIndex];
        let starsHtml = '';
        for (let i = 0; i < r.rating; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        for (let i = r.rating; i < 5; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        display.innerHTML = `
            <div class="review-stars" style="color: #ffd700; font-size: 1.2rem; margin-bottom: 1rem;">
                ${starsHtml}
            </div>
            <p class="review-text" style="font-size: 1.1rem; font-style: italic; margin-bottom: 1.5rem; line-height: 1.8;">"${r.text}"</p>
            <div class="review-author" style="font-weight: 700; color: white; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <i class="fab fa-discord" style="color: #5865F2;"></i> @${r.author}
            </div>
        `;
        // Fade in
        display.style.opacity = '1';
        
        // Update active dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if(index === currentReviewIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }, 500); // Wait 500ms for fade out before changing content and fading in
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % mockReviews.length;
    updateSliderPosition();
    resetSliderInterval();
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + mockReviews.length) % mockReviews.length;
    updateSliderPosition();
    resetSliderInterval();
}

function goToReview(index) {
    currentReviewIndex = index;
    updateSliderPosition();
    resetSliderInterval();
}

function startReviewSlider() {
    reviewInterval = setInterval(nextReview, 5000);
}

function resetSliderInterval() {
    clearInterval(reviewInterval);
    startReviewSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderReviews, 100);
});

// Button Click Sound Effect
const clickSound = new Audio('ui-soft-click-brukowskij-soft-keyboard-click-gentle-computer-input-2-0m00s.mp3');

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn') || e.target.closest('button') || e.target.closest('.slider-btn') || e.target.closest('.mobile-menu-btn')) {
        clickSound.currentTime = 0;
        clickSound.play().catch(err => console.log('Audio play prevented:', err));
    }
});