'use strict';

// Body loaded â†’ trigger hero entrance animation
window.addEventListener('load', () => document.body.classList.add('loaded'));

// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  const updateNav = () => nav.classList.toggle('on', scrollY > 40);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// Mobile burger
const burger = document.getElementById('burger');
const mob    = document.getElementById('mob');
if (burger && mob) {
  burger.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    const [s0, s1, s2] = burger.querySelectorAll('span');
    s0.style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
    s1.style.opacity   = open ? '0' : '';
    s2.style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// Hero mouse glow
const glow = document.getElementById('hero-glow');
if (glow) {
  const hero = glow.closest('.hero') || document.querySelector('.hero');
  if (hero) {
    let raf;
    let tx = window.innerWidth * 0.3, ty = window.innerHeight * 0.5;
    let cx = tx, cy = ty;
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    });
    hero.addEventListener('touchmove', e => {
      const rect = hero.getBoundingClientRect();
      const touch = e.touches[0];
      tx = touch.clientX - rect.left;
      ty = touch.clientY - rect.top;
    }, { passive: true });
    (function animate() {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      raf = requestAnimationFrame(animate);
    })();
  }
}

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.r').forEach(el => ro.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const was  = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!was) item.classList.add('open');
  });
});

// Count-up
document.querySelectorAll('[data-count]').forEach(el => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = target / 50;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.round(cur) + suffix;
        if (cur >= target) clearInterval(t);
      }, 24);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  io.observe(el);
});

// Year
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

// Config: download state
document.addEventListener('DOMContentLoaded', () => {
  if (!window.SITE) return;

  // Text tokens
  document.querySelectorAll('[data-s]').forEach(el => {
    const v = SITE[el.dataset.s];
    if (v !== undefined) el.textContent = v;
  });

  // Download button toggle
  const dlBtn    = document.getElementById('dl-btn');
  const dlComing = document.getElementById('dl-coming');
  if (SITE.DOWNLOAD_READY && SITE.APK_URL) {
    if (dlBtn)    { dlBtn.href = SITE.APK_URL; dlBtn.style.display = 'inline-flex'; }
    if (dlComing) dlComing.style.display = 'none';
  } else {
    if (dlBtn)    dlBtn.style.display = 'none';
    if (dlComing) dlComing.style.display = 'inline-flex';
  }
});


// Cursor spotlight on glassmorphic cards
document.querySelectorAll('.spotlight-host').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--sy', (e.clientY - r.top)  + 'px');
  });
});

// 3D Tilt effect on promo images
(function() {
  function initTilt() {
    document.querySelectorAll('.promo-img-wrap').forEach(function(el) {
      el.addEventListener('mousemove', function(e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width  - 0.5; // -0.5 to 0.5
        var y = (e.clientY - r.top)  / r.height - 0.5;
        var rotY =  x * 16;   // max 16deg horizontal tilt
        var rotX = -y * 10;   // max 10deg vertical tilt
        el.style.transform = 'perspective(900px) rotateX('+rotX+'deg) rotateY('+rotY+'deg) scale(1.03)';
        el.style.transition = 'transform 0.05s ease';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        el.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }
})();

