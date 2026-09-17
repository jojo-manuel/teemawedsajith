/* ==========================================================================
   AJITH & ALPHONSA WEDDING INVITATION - INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEnvelopeIntro();
  initCountdown();
  initNavScroll();
  initVenueTabs();
  initParticles();
  initRosePetals();
  initAudioPlayer();
  initAutoScroll();
  initShareButtons();
});

/* --------------------------------------------------------------------------
   1. COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCountdown() {
  // Marriage Target: Oct 22, 2026, 11:00:00 AM IST
  const targetDate = new Date('2026-10-22T11:00:00+05:30').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   2. NAVBAR & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy for Active Section
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      if (window.scrollY >= secTop) {
        current = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   3. VENUE TABS SWITCHER
   -------------------------------------------------------------------------- */
function initVenueTabs() {
  const tabBtns = document.querySelectorAll('.venue-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. GOLDEN DUST PARTICLES CANVAS
   -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4 - 0.2;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.008 + 0.003;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha += this.fadeSpeed;

      if (this.alpha >= 0.9 || this.alpha <= 0.1) {
        this.fadeSpeed = -this.fadeSpeed;
      }

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#D4AF37';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#FCF6BA';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   5. ROSE PETALS CANVAS & TOGGLE
   -------------------------------------------------------------------------- */
let petalsActive = true;

function initRosePetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 25;

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 10 + 10;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotSpeed = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.6 + 0.3;
      this.color = Math.random() > 0.4 ? '#9E3850' : '#E8A7B5';
    }

    update() {
      if (!petalsActive) return;
      this.y += this.speedY;
      this.x += Math.sin(this.y / 30) * 1.2 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y > height + 20) {
        this.reset();
      }
    }

    draw() {
      if (!petalsActive) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      
      // Draw Petal Shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  const petalBtn = document.getElementById('petal-toggle-btn');
  if (petalBtn) {
    petalBtn.addEventListener('click', () => {
      petalsActive = !petalsActive;
      petalBtn.classList.toggle('active', petalsActive);
      showToast(petalsActive ? '🌸 Rose Petal Shower Enabled' : 'Petal Shower Paused');
    });
  }
}





/* --------------------------------------------------------------------------
   0. TAP TO OPEN ENVELOPE INTRO
   -------------------------------------------------------------------------- */
function initEnvelopeIntro() {
  const overlay = document.getElementById('envelope-overlay');
  const card = document.getElementById('envelope-card');
  const openBtn = document.getElementById('open-envelope-btn');

  if (!overlay || !openBtn) return;

  function openEnvelope() {
    card.classList.add('opening');
    startAmbientMusic();
    
    const musicBtn = document.getElementById('music-toggle-btn');
    const statusText = document.getElementById('music-status-text');
    if (statusText) statusText.innerText = 'Playing 🎵';
    if (musicBtn) musicBtn.classList.add('gold-shine');

    setTimeout(() => {
      overlay.classList.add('opened');
      startAutoScroll();
    }, 600);
  }

  openBtn.addEventListener('click', openEnvelope);
}

/* --------------------------------------------------------------------------
   8. WEB AUDIO & SONG MUSIC PLAYER
   -------------------------------------------------------------------------- */
let audioCtx = null;
let isPlaying = false;
let audioTimer = null;

function initAudioPlayer() {
  const musicBtn = document.getElementById('music-toggle-btn');
  const statusText = document.getElementById('music-status-text');

  // Attempt immediate autoplay on load
  startAmbientMusic();

  // One-time interaction fallback to bypass mobile autoplay restrictions
  function unlockAutoplay() {
    if (!isPlaying) {
      startAmbientMusic();
      if (statusText) statusText.innerText = 'Playing 🎵';
      if (musicBtn) musicBtn.classList.add('gold-shine');
    }
    document.removeEventListener('click', unlockAutoplay);
    document.removeEventListener('touchstart', unlockAutoplay);
    document.removeEventListener('scroll', unlockAutoplay);
  }

  document.addEventListener('click', unlockAutoplay, { once: true });
  document.addEventListener('touchstart', unlockAutoplay, { once: true });
  document.addEventListener('scroll', unlockAutoplay, { once: true });

  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbientMusic();
      statusText.innerText = 'Playing 🎵';
      musicBtn.classList.add('gold-shine');
      showToast('🎵 Romantic wedding song playing');
    } else {
      stopAmbientMusic();
      statusText.innerText = 'Music';
      musicBtn.classList.remove('gold-shine');
      showToast('🔇 Music paused');
    }
  });
}

function startAmbientMusic() {
  isPlaying = true;

  // 1. Try playing audio element song
  const audioEl = document.getElementById('wedding-audio');
  if (audioEl) {
    audioEl.play().then(() => {
      return;
    }).catch(err => {
      console.log('Audio autoplay prevented, using Web Audio synth');
    });
  }

  // 2. Synthesized backup harp chords
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const freqs = [261.63, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  function playChordNote() {
    if (!isPlaying) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 2.6);

    audioTimer = setTimeout(playChordNote, 800 + Math.random() * 900);
  }

  playChordNote();
}

function stopAmbientMusic() {
  isPlaying = false;
  const audioEl = document.getElementById('wedding-audio');
  if (audioEl) {
    audioEl.pause();
  }
  if (audioTimer) {
    clearTimeout(audioTimer);
  }
}

/* --------------------------------------------------------------------------
   9. ADD TO CALENDAR FUNCTION
   -------------------------------------------------------------------------- */
function addToCalendar(title, startDateIso, location, details) {
  const start = new Date(startDateIso);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

  function formatDate(d) {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  }

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

  window.open(googleCalUrl, '_blank');
}

/* --------------------------------------------------------------------------
   10. SHARE BUTTONS (WHATSAPP & COPY LINK)
   -------------------------------------------------------------------------- */
function initShareButtons() {
  const shareMsg = `✨ You are cordially invited to the Wedding Celebrations of Ajith & Alphonsa! ✨\n\n💍 Engagement: Oct 17 @ Lourde Matha Church, Aruvikuzhy (11:45 AM)\nhttps://maps.app.goo.gl/AiFdYuFPBDNHpJtd9\n\n⛪ Holy Marriage: Oct 22 @ St. Mary's Church, Anickad (11:00 AM)\nhttps://maps.app.goo.gl/pvUyGsXzD1F2EM689?g_st=aw\n\nJoin us in celebration & prayers!`;

  const btnTop = document.getElementById('share-whatsapp-btn');
  const btnBottom = document.getElementById('whatsapp-share-bottom');
  const copyBtn = document.getElementById('copy-link-btn');

  function openWhatsApp() {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`;
    window.open(url, '_blank');
  }

  if (btnTop) btnTop.addEventListener('click', openWhatsApp);
  if (btnBottom) btnBottom.addEventListener('click', openWhatsApp);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shareMsg).then(() => {
        showToast('📋 Invitation details copied to clipboard!');
      }).catch(() => {
        showToast('Selected text copied');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   11. AUTO SCROLL CONTROLLER
   -------------------------------------------------------------------------- */
let isAutoScrolling = false;
let autoScrollFrame = null;
const scrollSpeed = 0.8; // Smooth 0.8px per frame

function initAutoScroll() {
  const btn = document.getElementById('autoscroll-toggle-btn');
  const statusText = document.getElementById('autoscroll-status-text');

  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isAutoScrolling) {
      startAutoScroll();
      showToast('📜 Auto Scroll started');
    } else {
      stopAutoScroll();
      showToast('📜 Auto Scroll paused');
    }
  });

  // Pause on manual touch/drag interaction if desired
  window.addEventListener('wheel', () => {
    if (isAutoScrolling) stopAutoScroll();
  }, { passive: true });
}

function startAutoScroll() {
  const btn = document.getElementById('autoscroll-toggle-btn');
  const statusText = document.getElementById('autoscroll-status-text');

  isAutoScrolling = true;
  if (statusText) statusText.innerText = 'Scrolling 📜';
  if (btn) btn.classList.add('gold-shine');

  function scrollStep() {
    if (!isAutoScrolling) return;

    // Check if reached bottom of page
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)) {
      // Smoothly wrap back to top or pause
      stopAutoScroll();
      return;
    }

    window.scrollBy(0, scrollSpeed);
    autoScrollFrame = requestAnimationFrame(scrollStep);
  }

  if (autoScrollFrame) cancelAnimationFrame(autoScrollFrame);
  autoScrollFrame = requestAnimationFrame(scrollStep);
}

function stopAutoScroll() {
  const btn = document.getElementById('autoscroll-toggle-btn');
  const statusText = document.getElementById('autoscroll-status-text');

  isAutoScrolling = false;
  if (autoScrollFrame) cancelAnimationFrame(autoScrollFrame);
  if (statusText) statusText.innerText = 'Auto Scroll';
  if (btn) btn.classList.remove('gold-shine');
}

/* --------------------------------------------------------------------------
   12. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${msg}`;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}
