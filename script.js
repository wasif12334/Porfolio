const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

const fadeItems = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
      fadeObserver.unobserve(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), index * 80);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeItems.forEach(item => fadeObserver.observe(item));
} else {
  fadeItems.forEach(item => item.classList.add('visible'));
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('.form-submit');
  const originalLabel = button.textContent;
  button.textContent = 'Sending…';
  button.disabled = true;

  try {
    await window.emailjs.send('service_ql5jzim', 'template_be7kg9h', {
      from_name: form.querySelector('#name').value,
      from_email: form.querySelector('#email').value,
      subject: form.querySelector('#subject').value,
      message: form.querySelector('#message').value,
    });
    button.textContent = 'Message sent ✓';
    form.reset();
  } catch {
    button.textContent = 'Send failed. Try again.';
  } finally {
    setTimeout(() => {
      button.textContent = originalLabel;
      button.disabled = false;
    }, 3000);
  }
}
