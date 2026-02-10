/* =========================================================
   ETERNITY THEME – CORE LOGIC (V2.1)
   - Enhanced Seasonal Animations
   - Spring Buds on Vine Frame
   - Summer Full Bloom Flowers
   - Horizontal Theme Buttons
   - Premium Improvements
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME SWITCHER & ANIMATION CONTROLLER ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const seasonalContainer = document.getElementById('seasonal-bg');
    let animationInterval = null;
    let budInterval = null;
    let flowerInterval = null;
  
    // Start with default theme (Spring)
    startSpring();
    activateThemeBtn('spring');
  
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.body.setAttribute('data-theme', theme);
        
        // Update active button
        activateThemeBtn(theme);
        
        // Reset animations
        clearSeasonalEffects();
        
        // Trigger specific animation
        if (theme === 'spring') startSpring();
        else if (theme === 'summer') startSummer();
        else if (theme === 'autumn') startAutumn();
        else if (theme === 'winter') startWinter();
      });
    });
  
    function activateThemeBtn(theme) {
      themeBtns.forEach(btn => {
        if (btn.dataset.theme === theme) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  
    function clearSeasonalEffects() {
      if (animationInterval) clearInterval(animationInterval);
      if (budInterval) clearInterval(budInterval);
      if (flowerInterval) clearInterval(flowerInterval);
      
      // Remove all dynamically created particles
      document.querySelectorAll('.falling-leaf, .snowflake, .petal, .summer-flower, .spring-bud').forEach(el => el.remove());
    }
  
    // --- ANIMATION: SPRING (Petals + Vine Frame with Buds) ---
    function startSpring() {
      // Add small buds to the vine frame
      budInterval = setInterval(() => {
        createSpringBud();
      }, 500);
      
      // Add falling petals
      animationInterval = setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('falling-leaf', 'petal');
        petal.style.background = '#ffb7b2';
        petal.style.borderRadius = '50% 0 50% 0';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animation = `fall ${Math.random() * 5 + 5}s linear`;
        petal.style.width = Math.random() * 12 + 6 + 'px';
        petal.style.height = petal.style.width;
        petal.style.zIndex = '2';
        
        seasonalContainer.appendChild(petal);
        
        setTimeout(() => petal.remove(), 10000);
      }, 800);
    }
    
    function createSpringBud() {
      const bud = document.createElement('div');
      bud.classList.add('spring-bud');
      
      // Position along vine frames (left or right side)
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const offset = Math.random() * 30 + 10; // 10-40px from edge
      
      if (side === 'left') {
        bud.style.left = offset + 'px';
      } else {
        bud.style.right = offset + 'px';
      }
      
      bud.style.top = Math.random() * 90 + 5 + 'vh'; // 5-95vh
      
      seasonalContainer.appendChild(bud);
      
      // Remove bud after animation
      setTimeout(() => {
        bud.style.opacity = '0';
        bud.style.transform = 'scale(0)';
        setTimeout(() => bud.remove(), 1000);
      }, 4000);
    }
  
    // --- ANIMATION: SUMMER (Vine Frame + Full Bloom Flowers) ---
    function startSummer() {
      // Add full bloom flowers along the frame
      flowerInterval = setInterval(() => {
        createSummerFlower();
      }, 400);
      
      // Add some gentle falling leaves (like summer breeze)
      animationInterval = setInterval(() => {
        const leaf = document.createElement('div');
        leaf.classList.add('falling-leaf');
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animation = `fall ${Math.random() * 8 + 8}s linear`;
        leaf.style.background = '#a8e6a3'; // Light green for summer
        leaf.style.width = Math.random() * 15 + 8 + 'px';
        leaf.style.height = leaf.style.width;
        leaf.style.opacity = '0.7';
        
        seasonalContainer.appendChild(leaf);
        
        setTimeout(() => leaf.remove(), 15000);
      }, 1200);
    }
    
    function createSummerFlower() {
      const flower = document.createElement('div');
      flower.classList.add('summer-flower');
      
      // Position flowers near the vine frames
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const offset = Math.random() * 40 + 20; // 20-60px from edge
      
      if (side === 'left') {
        flower.style.left = offset + 'px';
      } else {
        flower.style.right = offset + 'px';
      }
      
      flower.style.top = Math.random() * 90 + 5 + 'vh';
      
      // Randomize flower size and color
      const size = Math.random() * 8 + 20; // 20-28px
      flower.style.width = size + 'px';
      flower.style.height = size + 'px';
      
      // Summer flower colors (pinks, corals, yellows)
      const colors = [
        '#ffb7b2', // Light pink
        '#ff9aa2', // Pink
        '#ffd3b6', // Peach
        '#ffffb5', // Light yellow
        '#a8e6a3'  // Light green
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      flower.style.backgroundColor = color;
      flower.style.boxShadow = `
        0 -${size/4}px 0 ${color},
        0 ${size/4}px 0 ${color},
        -${size/4}px 0 0 ${color},
        ${size/4}px 0 0 ${color}
      `;

      seasonalContainer.appendChild(flower);
      
      // Flowers fade out after blooming
      setTimeout(() => {
        flower.style.opacity = '0';
        flower.style.transform = 'scale(0)';
        setTimeout(() => flower.remove(), 1000);
      }, 6000);
    }
  
    // --- ANIMATION: AUTUMN (Leaves) ---
    function startAutumn() {
      animationInterval = setInterval(() => {
        const leaf = document.createElement('div');
        leaf.classList.add('falling-leaf');
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animation = `fall ${Math.random() * 5 + 5}s linear`;
        
        // Autumn Colors
        const colors = ['#c97b63', '#e0a84e', '#8a5a44', '#d45d42', '#b86b2d'];
        leaf.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Randomize leaf shape slightly
        const shapes = ['10px 0', '0 10px', '5px 5px', '8px 2px'];
        leaf.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Random size
        const size = Math.random() * 15 + 12;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        
        // Add slight rotation variation
        leaf.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        seasonalContainer.appendChild(leaf);
        
        setTimeout(() => leaf.remove(), 10000);
      }, 400);
    }
  
    // --- ANIMATION: WINTER (Snow) ---
    function startWinter() {
      animationInterval = setInterval(() => {
        const snow = document.createElement('div');
        snow.classList.add('snowflake');
        
        // Different snowflake characters
        const flakes = ['❄', '•', '＊', '✻', '✧'];
        snow.innerHTML = flakes[Math.floor(Math.random() * flakes.length)];
        
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.fontSize = Math.random() * 25 + 12 + 'px';
        snow.style.animation = `fall ${Math.random() * 4 + 3}s linear`;
        snow.style.opacity = Math.random() * 0.5 + 0.5;
        
        // Slight horizontal movement
        snow.style.animation += `, sway ${Math.random() * 3 + 2}s ease-in-out infinite`;
        
        seasonalContainer.appendChild(snow);
        
        setTimeout(() => snow.remove(), 7000);
      }, 80);
    }
  
    // Inject Keyframes for animations
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
      @keyframes sway {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(20px); }
      }
    `;
    document.head.appendChild(styleSheet);
  
    // --- 2. DARK MODE TOGGLE ---
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', () => {
      const currentMode = document.body.getAttribute('data-mode');
      const newMode = currentMode === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-mode', newMode);
      
      // Update icon
      const icon = modeToggle.querySelector('.mode-icon');
      icon.textContent = newMode === 'dark' ? '☀️' : '🌙';
    });
  
    // --- 3. COUNTDOWN TIMER ---
    const weddingDate = new Date('Dec 20, 2026 00:00:00').getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById('days').innerText = days < 10 ? '0'+days : days;
      document.getElementById('hours').innerText = hours < 10 ? '0'+hours : hours;
      document.getElementById('minutes').innerText = minutes < 10 ? '0'+minutes : minutes;
      document.getElementById('seconds').innerText = seconds < 10 ? '0'+seconds : seconds;
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
  
    // --- 4. RSVP FORM (Demo) ---
    const rsvpForm = document.querySelector('.rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = rsvpForm.querySelector('.submit-btn');
      const originalText = btn.querySelector('.btn-text').innerText;
      
      btn.querySelector('.btn-text').innerText = 'Sending...';
      btn.style.opacity = '0.8';
      btn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you! Your RSVP has been received (Demo). We look forward to celebrating with you!');
        rsvpForm.reset();
        btn.querySelector('.btn-text').innerText = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }, 2000);
    });
  
    // --- 5. GIFT COPY BUTTON ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        // Find the number in the same card
        const number = this.previousElementSibling.previousElementSibling.innerText;
        navigator.clipboard.writeText(number).then(() => {
          const original = this.innerText;
          this.innerText = 'Copied!';
          this.style.background = '#4CAF50';
          this.style.borderColor = '#4CAF50';
          setTimeout(() => { 
            this.innerText = original; 
            this.style.background = '';
            this.style.borderColor = '';
          }, 2000);
        });
      });
    });
  
    // --- 6. SMOOTH SCROLL FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  
  });