// Mock Data for VxidSites

const mockVideos = [
    { title: "YimMenu V2 GTA Mod Menu", url: "https://www.youtube.com/watch?v=3IDIbszLATM&t=23s", id: "3IDIbszLATM", category: "gta" },
    { title: "Cayo Replay Money Glitch", url: "https://www.youtube.com/watch?v=yWBlp6vId9k", id: "yWBlp6vId9k", category: "gta" }
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
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('show');
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


    // YouTube Filters
    document.querySelectorAll('#youtube-categories .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#youtube-categories .filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderYouTube(e.target.getAttribute('data-category'));
        });
    });

    // Initialize initial views
    renderYouTube();
    handleHash();

    // --- Sidebar Proximity Logic ---
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 900) return; // Disable hover logic on mobile/tablet
            
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
    // Play sound if any button, close icon, or navigation link is clicked
    if (e.target.closest('.btn') || e.target.closest('button') || e.target.closest('.slider-btn') || e.target.closest('.mobile-menu-btn') || e.target.closest('.close-modal') || e.target.closest('.nav-links a')) {
        clickSound.currentTime = 0;
        clickSound.play().catch(err => console.log('Audio play prevented:', err));
    }
});