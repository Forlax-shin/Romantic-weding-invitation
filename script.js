// script.js - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // --- VARIABLES ---
    const elements = {
        loading: document.getElementById('loadingScreen'),
        opening: document.getElementById('opening'),
        openBtn: document.getElementById('openInvitation'),
        canvas: document.getElementById('silhouetteCanvas'),
        musicToggle: document.getElementById('musicToggle'),
        themeToggle: document.getElementById('themeToggle'),
        menuToggle: document.getElementById('menuToggle'),
        navMenu: document.querySelector('.nav-menu'),
        countdown: {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        }
    };

    let state = {
        musicPlaying: false,
        isDarkTheme: false,
        isMenuOpen: false,
        audio: null,
        weddingDate: new Date('2026-06-21T15:00:00').getTime()
    };

    // --- LOADING SCREEN ---
    setTimeout(() => {
        elements.loading.style.opacity = '0';
        setTimeout(() => {
            elements.loading.style.display = 'none';
            startOpeningAnimation();
        }, 500);
    }, 1500);

    // --- ENHANCED SILHOUETTE ANIMATION ---
    function startOpeningAnimation() {
        const silhouettes = document.querySelectorAll('.silhouette');
        const arms = document.querySelectorAll('.arm');
        
        // Animate groom from left
        setTimeout(() => {
            const groom = document.querySelector('.silhouette-groom');
            groom.style.left = '40%';
            groom.style.transform = 'translateX(0)';
            groom.style.opacity = '1';
        }, 500);

        // Animate bride from right
        setTimeout(() => {
            const bride = document.querySelector('.silhouette-bride');
            bride.style.right = '40%';
            bride.style.transform = 'translateX(0)';
            bride.style.opacity = '1';
        }, 1000);

        // Animate arms to hold hands
        setTimeout(() => {
            arms.forEach(arm => {
                if (arm.classList.contains('arm-left')) {
                    arm.style.transform = 'rotate(0deg)';
                } else {
                    arm.style.transform = 'rotate(0deg)';
                }
            });
            
            // Add heart animation
            document.querySelector('.heart-pulse').style.animation = 'heartPulse 2s ease-in-out infinite';
            
            // Draw connecting lines on canvas
            drawConnectingLines();
        }, 2000);
    }

    function drawConnectingLines() {
        const ctx = elements.canvas.getContext('2d');
        elements.canvas.width = window.innerWidth;
        elements.canvas.height = window.innerHeight;

        function draw() {
            ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
            
            // Draw pulsing circles
            const time = Date.now() * 0.001;
            const centerX = elements.canvas.width / 2;
            const centerY = elements.canvas.height * 0.4;
            
            // Draw love particles
            for (let i = 0; i < 50; i++) {
                const angle = (i / 50) * Math.PI * 2;
                const radius = 100 + Math.sin(time + i) * 20;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(232, 67, 147, ${0.3 + Math.sin(time + i) * 0.2})`;
                ctx.fill();
            }
            
            requestAnimationFrame(draw);
        }
        
        draw();
    }

    // --- OPEN INVITATION ---
    elements.openBtn.addEventListener('click', () => {
        const openingElements = document.querySelectorAll('.opening-content > *');
        
        openingElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
        });

        setTimeout(() => {
            elements.opening.style.transform = 'translateY(-100%)';
            elements.opening.style.opacity = '0';
            
            setTimeout(() => {
                elements.opening.style.display = 'none';
                document.body.classList.remove('locked');
                startBackgroundMusic();
            }, 1000);
        }, 500);
    });

    // --- COUNTDOWN TIMER ---
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = state.weddingDate - now;

        if (distance < 0) {
            Object.values(elements.countdown).forEach(el => el.textContent = '00');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        elements.countdown.days.textContent = String(days).padStart(2, '0');
        elements.countdown.hours.textContent = String(hours).padStart(2, '0');
        elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
        elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- MUSIC PLAYER ---
    function startBackgroundMusic() {
        if (!state.audio) {
            state.audio = new Audio();
            // Replace with your music URL
            state.audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            state.audio.loop = true;
            state.audio.volume = 0.3;
            state.audio.preload = 'auto';
        }
        
        // Auto-play with user interaction
        document.addEventListener('click', function initAudio() {
            if (!state.musicPlaying) {
                state.audio.play().catch(e => console.log("Audio play prevented:", e));
                state.musicPlaying = true;
                elements.musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            document.removeEventListener('click', initAudio);
        }, { once: true });
    }

    elements.musicToggle.addEventListener('click', () => {
        if (!state.audio) return;
        
        if (state.musicPlaying) {
            state.audio.pause();
            elements.musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            state.audio.play();
            elements.musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        state.musicPlaying = !state.musicPlaying;
    });

    // --- THEME TOGGLE ---
    elements.themeToggle.addEventListener('click', () => {
        state.isDarkTheme = !state.isDarkTheme;
        document.documentElement.setAttribute('data-theme', state.isDarkTheme ? 'dark' : 'light');
        elements.themeToggle.innerHTML = state.isDarkTheme ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('theme', state.isDarkTheme ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        state.isDarkTheme = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // --- MOBILE MENU ---
    elements.menuToggle.addEventListener('click', () => {
        state.isMenuOpen = !state.isMenuOpen;
        elements.navMenu.classList.toggle('active');
        elements.menuToggle.innerHTML = state.isMenuOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            elements.navMenu.classList.remove('active');
            elements.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            state.isMenuOpen = false;
        });
    });

    // --- NAVBAR SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        // Highlight active section
        highlightActiveNavLink();
    });

    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- GALLERY FUNCTIONALITY ---
    const galleryImages = [
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
        'https://i.pinimg.com/1200x/5b/b2/f8/5bb2f8bdb4bb2c8853d2fbb98a26eaa3.jpg',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&top&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=400&q=80'
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    let currentImageIndex = 0;

    // Load gallery images
    galleryImages.forEach((src, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${src}" alt="Gallery Image ${index + 1}" loading="lazy">`;
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
    });

    // Gallery navigation
    document.getElementById('prevPhoto').addEventListener('click', () => navigateGallery(-1));
    document.getElementById('nextPhoto').addEventListener('click', () => navigateGallery(1));

    function navigateGallery(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        // Implement lightbox navigation here
    }

    // --- GUESTBOOK FUNCTIONALITY ---
    const guestbookForm = document.getElementById('guestbookForm');
    const guestbookMessages = document.querySelector('.guestbook-messages');

    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !message) return;
        
        addGuestbookMessage(name, message);
        this.reset();
        
        // Show success message
        showToast('Message posted successfully!');
    });

    function addGuestbookMessage(name, message) {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <span class="message-author">${name}</span>
                <span class="message-date">${new Date().toLocaleDateString()}</span>
            </div>
            <p class="message-content">${message}</p>
        `;
        
        guestbookMessages.prepend(messageCard);
        
        // Save to localStorage
        saveGuestbookMessage({ name, message, date: new Date().toISOString() });
    }

    function saveGuestbookMessage(message) {
        let messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
        messages.unshift(message);
        if (messages.length > 50) messages = messages.slice(0, 50); // Keep only 50 latest
        localStorage.setItem('guestbookMessages', JSON.stringify(messages));
    }

    function loadGuestbookMessages() {
        const messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
        messages.forEach(msg => {
            addGuestbookMessage(msg.name, msg.message);
        });
    }

    // Load saved messages on page load
    loadGuestbookMessages();

    // --- RSVP FORM ---
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Save RSVP
        saveRSVP(data);
        
        // Show confirmation
        showToast('Thank you for your RSVP!', 'success');
        
        // Add to guest counter
        updateGuestCounter();
        
        this.reset();
    });

    function saveRSVP(data) {
        let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        rsvps.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
    }

    function updateGuestCounter() {
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        const totalGuests = rsvps.reduce((total, rsvp) => {
            return total + (parseInt(rsvp.guestCount) || 1);
        }, 0);
        
        // Update blossom tree
        updateBlossomTree(totalGuests);
    }

    // --- BLOSSOM TREE VISUALIZATION ---
    function updateBlossomTree(guestCount) {
        const blossomContainer = document.getElementById('blossomContainer');
        if (!blossomContainer) return;
        
        // Clear and add blossoms based on guest count
        blossomContainer.innerHTML = '';
        
        for (let i = 0; i < Math.min(guestCount, 50); i++) {
            setTimeout(() => {
                addBlossom(blossomContainer);
            }, i * 100);
        }
    }

    function addBlossom(container) {
        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        
        const left = 20 + Math.random() * 60;
        const top = 10 + Math.random() * 80;
        const size = 12 + Math.random() * 12;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 3;
        
        blossom.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            background: radial-gradient(circle at 30% 30%, 
                rgba(255,182,193,${0.7 + Math.random() * 0.3}), 
                rgba(255,105,180,${0.5 + Math.random() * 0.3}));
        `;
        
        container.appendChild(blossom);
    }

    // --- ADD TO CALENDAR ---
    document.querySelectorAll('.add-to-calendar').forEach(btn => {
        btn.addEventListener('click', function() {
            const event = this.dataset.event;
            const eventData = {
                ceremony: {
                    title: 'Emma & Daniel Wedding Ceremony',
                    start: '2026-06-21T15:00:00',
                    end: '2026-06-21T17:00:00',
                    location: "St. Mary's Cathedral, Bali"
                },
                reception: {
                    title: 'Emma & Daniel Wedding Reception',
                    start: '2026-06-21T18:30:00',
                    end: '2026-06-22T00:00:00',
                    location: 'Grand Sunset Ballroom, Bali'
                }
            };
            
            addEventToCalendar(eventData[event]);
            showToast('Event added to calendar!');
        });
    });

    function addEventToCalendar(event) {
        // Implementation for calendar integration
        console.log('Adding event:', event);
    }

    // --- WEATHER WIDGET ---
    async function updateWeather() {
        try {
            // In production, use a real weather API
            const weatherWidget = document.querySelector('.weather-widget');
            if (!weatherWidget) return;
            
            // Simulate weather data
            const weather = {
                temp: '28°C',
                condition: 'Sunny',
                icon: 'fa-sun'
            };
            
            weatherWidget.querySelector('.temp').textContent = weather.temp;
            weatherWidget.querySelector('i').className = `fas ${weather.icon}`;
        } catch (error) {
            console.log('Weather update failed:', error);
        }
    }

    // Update weather every hour
    updateWeather();
    setInterval(updateWeather, 3600000);

    // --- UTILITY FUNCTIONS ---
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .blossom {
            position: absolute;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            opacity: 0.9;
            animation: blossomFloat ease-in-out infinite;
            box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
            filter: blur(0.5px);
        }
        
        @keyframes blossomFloat {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
            50% { transform: translateY(-10px) rotate(180deg) scale(1.1); }
        }
    `;
    document.head.appendChild(style);

    // --- WINDOW RESIZE HANDLER ---
    window.addEventListener('resize', () => {
        if (elements.canvas) {
            elements.canvas.width = window.innerWidth;
            elements.canvas.height = window.innerHeight;
        }
    });

    // --- INITIALIZE BLOSSOM TREE ---
    setTimeout(() => {
        const initialGuests = 12;
        updateBlossomTree(initialGuests);
    }, 2000);

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize when window loads
window.addEventListener('load', () => {
    // Any additional onload functionality
});