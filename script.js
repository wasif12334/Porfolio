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

  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs.send(
    "service_ql5jzim",
    "template_be7kg9h",
    {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    }
  )
  .then(() => {
    btn.textContent = "Message Sent ✓";
    btn.style.background = "green";

    setTimeout(() => {
      btn.textContent = "Send Message →";
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  })
  .catch((error) => {
    console.log(error);
    btn.textContent = "Failed ❌";

    setTimeout(() => {
      btn.textContent = "Send Message →";
      btn.disabled = false;
    }, 3000);
  });
}
