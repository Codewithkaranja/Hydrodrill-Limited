document.addEventListener("DOMContentLoaded", () => {
// Mobile Menu Toggle with improved functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = navToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu on ESC key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Sticky Header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (!header) return;

  if (window.scrollY > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// Set current year and date
const yearEl = document.getElementById('currentYear');
const dateEl = document.getElementById('currentDate');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Validation
    let isValid = true;
    const errorMessages = [];

    if (!name) {
      isValid = false;
      errorMessages.push('Please enter your full name');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      isValid = false;
      errorMessages.push('Please enter your email address');
    } else if (!emailRegex.test(email)) {
      isValid = false;
      errorMessages.push('Please enter a valid email address');
    }

    const phoneRegex = /^(?:254|\+254|0)?(7\d{8})$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phone) {
      isValid = false;
      errorMessages.push('Please enter your phone number');
    } else if (!phoneRegex.test(cleanPhone)) {
      isValid = false;
      errorMessages.push('Please enter a valid Kenyan phone number (e.g., 0722 233 600)');
    }

    if (!service) {
      isValid = false;
      errorMessages.push('Please select a service');
    }

    if (!message) {
      isValid = false;
      errorMessages.push('Please enter your message');
    } else if (message.length < 10) {
      isValid = false;
      errorMessages.push('Please provide more details in your message');
    }

    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you for your message! We will contact you within 1-2 hours.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1500);
    } else {
      alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Auto-format phone number
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('254')) {
      value = value.substring(3);
    }

    if (value.length > 0) {
      value = value.match(new RegExp('.{1,3}', 'g')).join(' ');
    }

    e.target.value = value;
  });
}

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length) {
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
          const q = other.querySelector(".faq-question");
          const a = other.querySelector(".faq-answer");
          if (q) q.setAttribute("aria-expanded", "false");
          if (a) a.hidden = true;
        }
      });

      const isOpen = item.classList.toggle("active");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      answer.hidden = !isOpen;
    });
  });
}
});