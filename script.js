/* ===================================================
   Pawan Puthran – Portfolio JavaScript
   =================================================== */

/* ---------- Cursor Glow ---------- */
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

/* ---------- Navbar scroll + active link ---------- */
(function () {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class for background change
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active link
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
})();

/* ---------- Hamburger menu ---------- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ---------- Typewriter Effect ---------- */
(function () {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const words = [
    'Software Developer',
    'Full Stack Engineer',
    'Problem Solver',
    'Tech Enthusiast',
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const word = words[wordIdx];

    if (!deleting) {
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }

    setTimeout(type, deleting ? 60 : 90);
  }

  type();
})();

/* ---------- Particle Background (Canvas) ---------- */
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 70;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    return {
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      r: random(1, 2.5),
      vx: random(-0.3, 0.3),
      vy: random(-0.4, -0.1),
      alpha: random(0.2, 0.6),
    };
  }

  for (let i = 0; i < COUNT; i++) {
    particles.push(createParticle());
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 142, 247, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();

/* ---------- Scroll Reveal (Intersection Observer) ---------- */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay based on sibling index
          const delay = (i % 4) * 100;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ---------- Contact Form ---------- */
(function () {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulate async submission
    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1200);
  });
})();
