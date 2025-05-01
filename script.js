// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("75xB20-G1JQm9LGxo");
})();

// Function to show notification
function showNotification(type, title, message, code = null) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <div class="content">
            <div class="title">${title}</div>
            <div class="message">${message}</div>
            ${code ? `<div class="code">${code}</div>` : ''}
        </div>
        <div class="close-btn">
            <i class="fas fa-times"></i>
        </div>
    `;

    container.appendChild(notification);

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => notification.remove(), 500);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Form submission handling with debounce
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

document.getElementById('contact-form').addEventListener('submit', debounce(function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const templateParams = {
        from_name: document.getElementById('from_name').value,
        from_email: document.getElementById('from_email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: 'Wasif Awan',
        to_email: 'muhummadwasifawan@gmail.com'
    };

    emailjs.send('service_jh931wi', 'template_yf12r9d', templateParams)
        .then(function(response) {
            showNotification('success', 'Success!', 'Your message has been sent successfully.');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#28a745';
            document.getElementById('contact-form').reset();
        })
        .catch(function(error) {
            showNotification('error', 'Error!', 'Failed to send message. Please try again.');
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
            submitBtn.style.backgroundColor = '#dc3545';
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '#4834d4';
                submitBtn.disabled = false;
            }, 3000);
        });
}, 500));

// Page Loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 300);
        }, 500);
    }
});

// Optimized scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// Throttled scroll handler
const updateScrollProgress = () => {
    requestAnimationFrame(() => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// Optimized intersection observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing Animation
const typedTextElement = document.querySelector('.typed-text');
const textArray = ['Web Developer', 'AI Enthusiast', 'Software Engineer'];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) setTimeout(type, 500);
}); 