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
    // Replace with your EmailJS public key
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

    // Handle close button
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => notification.remove(), 500);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Prepare the template parameters
    const templateParams = {
        from_name: document.getElementById('from_name').value,
        from_email: document.getElementById('from_email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: 'Wasif Awan',
        to_email: 'muhummadwasifawan@gmail.com'
    };

    // Send the email using EmailJS
    emailjs.send('service_jh931wi', 'template_yf12r9d', templateParams)
        .then(function(response) {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Show success notification with request ID
            showNotification(
                'success',
                'Message Sent Successfully!',
                'Your message has been delivered. I will get back to you soon.',
                `Request ID: ${response.status}`
            );
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '#4834d4';
                submitBtn.disabled = false;
            }, 3000);
        }, function(error) {
            // Show error message
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
            submitBtn.style.backgroundColor = '#dc3545';
            
            // Show error notification
            showNotification(
                'error',
                'Failed to Send Message',
                'There was an error sending your message. Please try again.',
                `Error: ${error.text}`
            );
            
            console.error('EmailJS error:', error);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '#4834d4';
                submitBtn.disabled = false;
            }, 3000);
        });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add particle background
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    
    // Random size
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation duration
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 5000);
};

// Create particles periodically
setInterval(createParticle, 300);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Skills animation
const animateSkills = () => {
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    bar.style.transform = 'scaleX(1)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
};

// Call the function when the page loads
window.addEventListener('load', animateSkills);

// Typing Animation for roles
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
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 500);
    }
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) setTimeout(type, 500);
}); 