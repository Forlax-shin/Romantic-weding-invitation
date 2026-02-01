document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // --- 1. ENHANCED OPENING ANIMATION ---
    const openingSection = document.getElementById('opening');
    const openBtn = document.getElementById('openBtn');
    const silhouettes = document.querySelectorAll('.silhouette');
    const heart = document.querySelector('.heart-anim');
    const heartGlow = document.querySelector('.heart-glow');
    const chapelScene = document.querySelector('.chapel-scene');

    // Animate chapel scene first
    setTimeout(() => {
        chapelScene.style.opacity = '1';
        chapelScene.style.transform = 'translateY(0)';
    }, 300);

    // Animate groom silhouette from left
    setTimeout(() => {
        const groom = document.querySelector('.groom-sil');
        groom.style.opacity = '1';
        groom.style.transform = 'translateY(0)';
        groom.style.left = '30%';
    }, 1000);

    // Animate bride silhouette from right
    setTimeout(() => {
        const bride = document.querySelector('.bride-sil');
        bride.style.opacity = '1';
        bride.style.transform = 'translateY(0)';
        bride.style.right = '30%';
    }, 1500);

    // Make them meet in the middle
    setTimeout(() => {
        const groom = document.querySelector('.groom-sil');
        const bride = document.querySelector('.bride-sil');
        
        groom.style.left = '45%';
        bride.style.right = '45%';
        
        // Animate arms to hold hands
        const groomArms = groom.querySelectorAll('.sil-arm-left, .sil-arm-right');
        const brideArms = bride.querySelectorAll('.sil-arm-left, .sil-arm-right');
        
        groomArms.forEach(arm => {
            arm.style.transform = 'rotate(0deg)';
        });
        
        brideArms.forEach(arm => {
            arm.style.transform = 'rotate(0deg)';
        });
        
        // Show heart glow
        heartGlow.style.animation = 'heartGlow 2s ease-in-out infinite';
        heartGlow.style.opacity = '1';
        
        // Show heart
        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = 'translate(-50%, -50%) scale(1)';
            heart.style.animation = 'heartbeat 1.5s ease-in-out infinite';
        }, 500);
    }, 2500);

    // Open invitation button
    openBtn.addEventListener('click', () => {
        // Add fade out animation to all opening elements
        const openingElements = document.querySelectorAll('.opening-content > *');
        openingElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
        });
        
        // Slide up the entire opening section
        setTimeout(() => {
            openingSection.style.transform = 'translateY(-100%)';
            openingSection.style.opacity = '0';
            
            setTimeout(() => {
                openingSection.style.display = 'none';
                document.body.classList.remove('locked');
                
                // Play background music
                playBackgroundMusic();
            }, 1000);
        }, 500);
    });

    // --- 2. COUNTDOWN TIMER ---
    const weddingDate = new Date("2026-06-21T15:00:00").getTime();
    const timer = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.querySelector(".countdown").innerHTML = 
                '<div class="time-box"><span>00</span><small>Days</small></div>' +
                '<div class="time-box"><span>00</span><small>Hours</small></div>' +
                '<div class="time-box"><span>00</span><small>Mins</small></div>' +
                '<div class="time-box"><span>00</span><small>Secs</small></div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    // Initialize countdown
    updateCountdown();

    // --- 3. MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- 4. MUSIC TOGGLE ---
    const musicToggle = document.querySelector('.music-toggle');
    let isMusicPlaying = false;
    let audio;

    function playBackgroundMusic() {
        // Create audio element if it doesn't exist
        if (!audio) {
            audio = new Audio();
            audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace with your music URL
            audio.loop = true;
            audio.volume = 0.5;
        }
        
        if (!isMusicPlaying) {
            audio.play().catch(e => console.log("Autoplay prevented:", e));
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    musicToggle.addEventListener('click', () => {
        if (!audio) {
            playBackgroundMusic();
            return;
        }
        
        if (isMusicPlaying) {
            audio.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audio.play();
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- 5. GALLERY ANIMATION ---
    const galleryRows = document.querySelectorAll('.gallery-row');
    
    // Duplicate items for seamless scrolling
    galleryRows.forEach(row => {
        const items = row.innerHTML;
        row.innerHTML = items + items + items; // Triple the items for seamless loop
        
        // Adjust animation duration based on row width
        const totalWidth = row.scrollWidth;
        const speed = totalWidth / 100; // Adjust divisor for speed control
        row.style.animationDuration = `${speed}s`;
    });

    // --- 6. REALISTIC SAKURA TREE VISUALIZATION ---
    const blossomContainer = document.getElementById('blossomContainer');
    const guestCountDisplay = document.getElementById('guestCountDisplay');
    let guestCount = 0;

    function addBlossomToTree() {
        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        
        // Random position on branches
        const left = 20 + Math.random() * 60; // 20% - 80%
        const top = 10 + Math.random() * 70; // 10% - 80%
        const scale = 0.8 + Math.random() * 0.5; // 0.8 - 1.3
        const rotation = Math.random() * 360;
        const duration = 4 + Math.random() * 4; // 4-8 seconds
        
        // Calculate position based on branch structure
        const branchX = Math.random();
        let calculatedLeft, calculatedTop;
        
        if (branchX < 0.3) {
            calculatedLeft = 30 + Math.random() * 20;
            calculatedTop = 30 + Math.random() * 40;
        } else if (branchX < 0.6) {
            calculatedLeft = 50 + Math.random() * 20;
            calculatedTop = 20 + Math.random() * 50;
        } else {
            calculatedLeft = 40 + Math.random() * 30;
            calculatedTop = 40 + Math.random() * 30;
        }
        
        blossom.style.left = `${calculatedLeft}%`;
        blossom.style.top = `${calculatedTop}%`;
        blossom.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        blossom.style.animationDuration = `${duration}s`;
        
        // Random blossom type
        const blossomType = Math.random();
        if (blossomType > 0.7) {
            blossom.style.background = 'radial-gradient(circle at 30% 30%, #FFC0CB, #FF69B4, #DB7093)';
        } else if (blossomType > 0.4) {
            blossom.style.background = 'radial-gradient(circle at 30% 30%, #FFB6C1, #FF1493, #C71585)';
        }
        
        // Animate appearance
        blossom.style.opacity = '0';
        blossom.style.animationDelay = `${Math.random() * 2}s`;
        
        blossomContainer.appendChild(blossom);
        
        // Animate appearance
        setTimeout(() => {
            blossom.style.opacity = '0.9';
            blossom.style.transition = 'opacity 0.8s ease';
        }, 100);
        
        // Add extra falling petals occasionally
        if (Math.random() > 0.8) {
            addFallingPetal();
        }
        
        // Add gentle sway to the branch where blossom is added
        const branchIndex = Math.floor(Math.random() * 6) + 1;
        const branch = document.querySelector(`.branch-${branchIndex}`);
        if (branch) {
            branch.style.transform += ' rotate(2deg)';
            setTimeout(() => {
                branch.style.transform = branch.style.transform.replace(' rotate(2deg)', '');
            }, 300);
        }
    }

    function addFallingPetal() {
        const fallingPetals = document.querySelector('.falling-petals');
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const left = Math.random() * 90 + 5; // 5% - 95%
        const duration = 8 + Math.random() * 8; // 8-16 seconds
        const delay = Math.random() * 5;
        const scale = 0.7 + Math.random() * 0.6; // 0.7-1.3
        
        // Random petal color
        const petalColor = Math.random();
        if (petalColor > 0.7) {
            petal.style.background = 'linear-gradient(135deg, rgba(255,192,203,0.9), rgba(255,105,180,0.7))';
        } else if (petalColor > 0.4) {
            petal.style.background = 'linear-gradient(135deg, rgba(255,182,193,0.9), rgba(219,112,147,0.7))';
        }
        
        petal.style.left = `${left}%`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.transform = `scale(${scale})`;
        
        fallingPetals.appendChild(petal);
        
        // Remove after animation completes
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    // Simulate initial guests (for demo purposes)
    function simulateInitialGuests() {
        const initialGuests = 24; // Initial blossoms
        for (let i = 0; i < initialGuests; i++) {
            setTimeout(() => {
                guestCount++;
                guestCountDisplay.textContent = guestCount;
                addBlossomToTree();
            }, i * 150);
        }
    }

    // Start with some initial guests
    simulateInitialGuests();

    // --- 7. RSVP FORM HANDLING ---
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('guestName').value;
        const attendance = document.getElementById('attendance').value;
        const guestNumber = parseInt(document.getElementById('guestCount').value);
        
        // Add blossom for each guest
        for (let i = 0; i < guestNumber; i++) {
            setTimeout(() => {
                addBlossomToTree();
            }, i * 500);
        }
        
        // Update guest count display
        const currentCount = parseInt(guestCountDisplay.textContent);
        guestCountDisplay.textContent = currentCount + guestNumber;
        
        // Show celebration animation
        if (attendance === 'Yes') {
            celebrateSubmission();
        }
        
        // Show confirmation message
        const message = `Thank you, ${name}! Your ${attendance === 'Yes' ? 'confirmation' : 'response'} has been recorded.`;
        
        // Create a beautiful alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'form-alert';
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-check-circle"></i>
                <h4>Thank You!</h4>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Reset form
        rsvpForm.reset();
        
        // In production, you would submit to Google Forms:
        // fetch(this.action, { method: 'POST', body: formData });
        
        // Or redirect to Google Forms:
        // window.open(this.action, '_blank');
    });

    // Celebration animation for RSVP submission
    function celebrateSubmission() {
        // Add extra falling petals
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                addFallingPetal();
            }, i * 200);
        }
        
        // Gentle tree sway
        const tree = document.querySelector('.realistic-tree');
        tree.style.transform = 'translateX(5px)';
        setTimeout(() => {
            tree.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                tree.style.transform = 'translateX(0)';
            }, 300);
        }, 300);
        
        // Blossom pulse effect
        const blossoms = document.querySelectorAll('.blossom');
        blossoms.forEach((blossom, index) => {
            setTimeout(() => {
                const originalScale = blossom.style.transform.match(/scale\(([\d.]+)\)/);
                const scale = originalScale ? parseFloat(originalScale[1]) : 1;
                blossom.style.transform = blossom.style.transform.replace(
                    /scale\([\d.]+\)/,
                    `scale(${scale * 1.3})`
                );
                setTimeout(() => {
                    blossom.style.transform = blossom.style.transform.replace(
                        /scale\([\d.]+\)/,
                        `scale(${scale})`
                    );
                }, 300);
            }, index * 50);
        });
    }

    // --- 8. SMOOTH SCROLLING FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 9. NAVBAR SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });

    // --- 10. PARALLAX EFFECT FOR HERO SECTION ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * 0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
    
    // --- 11. AUTO-ADD BLOSSOMS FOR DEMO ---
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 5 seconds
            addBlossomToTree();
            guestCount++;
            guestCountDisplay.textContent = guestCount;
        }
    }, 5000);
});

// Add custom alert styles
const style = document.createElement('style');
style.textContent = `
    .form-alert {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }
    
    .alert-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: slideUp 0.5s ease;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    .alert-content i {
        font-size: 4rem;
        color: var(--primary);
        margin-bottom: 20px;
    }
    
    .alert-content h4 {
        font-family: var(--font-heading);
        color: var(--primary-dark);
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .alert-content p {
        color: var(--text-light);
        margin-bottom: 25px;
        line-height: 1.6;
    }
    
    .alert-content button {
        padding: 12px 30px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .alert-content button:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);