/* ============================================================
   MUHAMMAD WASIF — PORTFOLIO SCRIPTS
   main.js
   ============================================================ */


/* ─── MOBILE NAVIGATION ──────────────────────────────────── */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Toggle mobile menu open/close
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ─── SCROLL FADE-IN ANIMATIONS ──────────────────────────── */

/**
 * Uses IntersectionObserver to add a .visible class
 * to elements with .fade-in once they enter the viewport.
 * Stagger delay (i * 80ms) creates a cascade effect.
 */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
      }
    });
  },
  {
    threshold:   0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

// Observe every element marked for fade-in
document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});


/* ─── CONTACT FORM ───────────────────────────────────────── */

/**
 * Handles contact form submission.
 * Shows a success state on the button, then resets after 3s.
 */
function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector('.form-submit');
  const originalText = btn.textContent;

  // Success feedback
  btn.textContent        = 'Message Sent ✓';
  btn.style.background   = 'var(--green)';
  btn.disabled           = true;

  // Reset after 3 seconds
  setTimeout(() => {
    btn.textContent      = originalText;
    btn.style.background = '';
    btn.disabled         = false;
    e.target.reset();
  }, 3000);
}
